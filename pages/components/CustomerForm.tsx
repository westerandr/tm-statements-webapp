import { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  FormControl,
  Typography,
  Button,
  Container,
  InputAdornment,
  Grid
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { database } from '../../config/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'


const customerCollection = collection(database, 'users');

const initialState = {
  firstName: '',
  lastName: '',
  handle: '',
  amountSpent: 0,
  currentPoints: 0,
};

function CustomerForm() {
  const [customer, setCustomer] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setCustomer(initialState);
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCustomer({
      ...customer,
      amountSpent: 0,
      currentPoints: 0,
    });
    if(!customer.firstName || !customer.lastName || !customer.handle) {
      toast('Please fill out all fields', { type: 'error' });
      return;
    }
    // query for existing customer
    const q = await query(customerCollection, where('handle', '==', customer.handle));
    const snapshotDoc = await getDocs(q);
    if(!snapshotDoc.empty) {
      toast(`Customer with handle @${customer.handle} already exists`, { type: 'error' });
      return;
    }


    const result = await addDoc(customerCollection, customer);
    if(result) {
      toast('Customer added successfully', { type: 'success' });
      clearForm();
    }




  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Grid container sx={{mb: '1rem'}}>
          <Grid item xs={12} md={6} justifyContent="start">
            <Typography variant="h6" gutterBottom>
            New Customer
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="end">
          <Button onClick={clearForm} color="secondary">
            Clear
          </Button>
          </Grid>
        </Grid>

        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Instagram Handle"
            variant="outlined"
            name="handle"
            value={customer.handle}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <Button type='submit' variant="contained" color="secondary">
            Add
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default CustomerForm;
