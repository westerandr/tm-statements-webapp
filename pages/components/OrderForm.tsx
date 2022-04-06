import { ChangeEvent, FormEvent, useState } from 'react';
import { database } from '../../config/firebase';
import { doc, addDoc, updateDoc, getDocs, collection, query, where, Timestamp, getDoc } from 'firebase/firestore';
import { Container, Grid, Typography, Button, FormControl, TextField, InputAdornment, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Customer, Order } from '../../lib/types';
import { toast } from 'material-react-toastify';

type OrderFormProps = {
  customers: Customer[];
  addOrder: (order: Order) => void;
}

const initState = {
  amount: 0,
  items: "",
  user: "",
  created: Timestamp.now(),
}

const customersCollection = collection(database, 'users');
const redemptionsCollection = collection(database, 'redemptions');
const ordersCollection = collection(database, 'orders');

function OrderForm({ customers, addOrder }: OrderFormProps ) {
  const [order, setOrder] = useState(initState);
  const [numRedemptionsAvailable, setNumRedemptionsAvailable] = useState(0);

  const getNumRedemptionsAvailable = (uid: string) => {
    const q = query(redemptionsCollection, where('user', '==', uid), where('used', '==', false) );
    getDocs(q).then(snapshot => {
     setNumRedemptionsAvailable(snapshot.docs.length);
    });
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (order.user === "" || order.items === "" || order.amount === 0) {
      toast.error("Please fill out all fields");
      return;
    }
    setOrder({
      ...order,
      created: Timestamp.now(),
    });

    let customer: Customer | undefined;
    try{
       customer = customers.find(c => c.uid === order.user);
       if(!customer) throw new Error("Customer not found");
      // query for existing customer
      const q = await query(customersCollection, where('handle', '==', customer?.handle));
      const snapshotDoc = await getDocs(q);
      if(snapshotDoc.empty) throw new Error("Customer not found");
    }catch(e){
        toast(`Customer ${customer?.firstName} ${customer?.lastName} does not exist`, { type: 'error' });
        return;
    }
    const docRef = doc(customersCollection, customer.uid);
    const result = await addDoc(ordersCollection, order);
    if(result) {
      toast(`Order created successfully`, { type: 'success' });
      const orderDoc = await getDoc(result);
      const newOrderData = orderDoc.data();
      addOrder({uid: result.id, amount: newOrderData?.amount, items: newOrderData?.items, user: newOrderData?.user, created: newOrderData?.created?.toDate() } as Order);
      const points = Math.floor(order.amount);
      updateDoc(docRef, {
        currentPoints: Number(customer?.currentPoints) + points,
        amountSpent: Number(customer?.amountSpent) + order.amount,
      }).then(() => toast(`${customer?.firstName} ${customer?.lastName}'s points updated successfully`, { type: 'success' }))
      .catch(() => toast("Points could not be added to Customer Account. Please Edit Customer Manually", { type: 'error' }))
      .finally(() => clearForm());
    
      
    }else {
      toast("Order could not be processed", { type: 'error' });
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name == "amount") {
      setOrder({
        ...order,
        [e.target.name]: Math.abs(parseFloat(e.target.value))
      })
    }else{
      setOrder({
        ...order,
        [e.target.name]: e.target.value
      })
    }
   
  }

  const handleSelect = (e: SelectChangeEvent<string>) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
    getNumRedemptionsAvailable(e.target.value);
  }

  const clearForm = () => {
    setNumRedemptionsAvailable(0);
    setOrder(initState);
  }

  return (
    <Container maxWidth="lg">
       <form onSubmit={onSubmit}>
        <Grid container sx={{mb: '1rem'}}>
          <Grid item xs={12} md={6} justifyContent="start">
            <Typography variant="h6" gutterBottom>
              Create Order
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="end">
          <Button onClick={clearForm} color="secondary">
            Clear
          </Button>
          </Grid>
        </Grid>

        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
        <InputLabel id="customer-label">Customer</InputLabel>
        <Select
          label="Customer"
          labelId="customer-label"
          name="user"
          variant='outlined'
          value={order.user}
          onChange={handleSelect}
          placeholder='Select Customer'
          disabled={customers?.length === 0 || false}
        >
          {!customers || customers?.length === 0 && <MenuItem value="">No Customers Found. Create One First.</MenuItem>}
          {customers && customers.length > 0 && customers?.map((customer) => (
            <MenuItem
              key={customer.uid}
              value={customer.uid}
            >
              {`${customer.firstName} ${customer.lastName}`}
            </MenuItem>
          ))}
        </Select>
            { numRedemptionsAvailable > 0 && <Typography color="secondary" variant="body2" gutterBottom> {`${numRedemptionsAvailable} Redemptions Available`} </Typography> }
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Items"
            variant="outlined"
            name="items"
            minRows={3}
            multiline
            value={order.items}
            helperText="Enter items purchased (Separate Each Item by Commas)"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
            name="amount"
            value={order.amount}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth >
          <Button type='submit' variant="contained" color="secondary" disabled={customers?.length < 1 || false} >
            Place Order
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}

export default OrderForm