import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
import { addDoc, collection, query, where, getDocs, updateDoc, doc, DocumentReference } from 'firebase/firestore'
import { Customer } from '../../lib/types';


const customerCollection = collection(database, 'users');

type CustomerFormProps = {
  mode: string;
  setMode: (mode: string, customer: Customer) => void;
  editableCustomer: Customer;
}

const initialState = {
  firstName: '',
  lastName: '',
  handle: '',
  amountSpent: 0,
  currentPoints: 0,
};

function CustomerForm({ mode, setMode, editableCustomer} : CustomerFormProps) {
  const [customer, setCustomer] = useState(initialState);

  useEffect(() => {
    if(mode === 'edit') {
      setCustomer({
        ...editableCustomer,
      })
    }else{
      setCustomer(initialState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setCustomer(initialState);
    setMode('create', {
      uid: '',
      firstName: '',
      lastName: '',
      handle: '',
      amountSpent: 0,
      currentPoints: 0
    });
  }

  const createCustomer = async () => {
    if(!customer.firstName || !customer.lastName || !customer.handle) {
      toast('Please fill out all fields', { type: 'error' });
      return;
    }
    setCustomer({
      ...customer,
      amountSpent: 0,
      currentPoints: 0,
    });
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

  const updateCustomer = async () => {
    if(!customer.firstName || !customer.lastName || !customer.handle || !editableCustomer.uid) {
      toast('Something went wrong', { type: 'error' });
      return;
    }
    let document: DocumentReference;
    try{
       document = doc(customerCollection, editableCustomer.uid);
    }catch(e){
      toast('Customer does not exist', { type: 'error' });
      clearForm();
      return;
    }

    await updateDoc(document, customer).then(() => {
      toast('Customer updated successfully', { type: 'success' });
    }).catch(err => {
      toast(err.message, { type: 'error' });
    }).finally(() => { 
      clearForm();
    });
  } 
  

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(mode === 'create') {
      await createCustomer();
    }else if(mode === 'edit'){
      await updateCustomer();
    }
    
 
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Grid container sx={{mb: '1rem'}}>
          <Grid item xs={12} md={6} justifyContent="start">
            <Typography variant="h6" gutterBottom>
            { mode === 'create' ? 'Add Customer' : 'Edit Customer' }
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
        { mode == 'edit' && <>
          
          <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Amount Spent"
            variant="outlined"
            name="amountSpent"
            value={customer.amountSpent}
            onChange={handleChange}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          </FormControl>
           <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Current Points"
            variant="outlined"
            name="currentPoints"
            type="number"
            value={customer.currentPoints}
            onChange={handleChange}
          />
          </FormControl>
          </>
        }
        <FormControl sx={{ marginBottom: '1rem', width: '150px' }} >
          <Button type='submit' variant="contained" color="secondary">
            { mode === 'create' ? 'Add' : 'Update' }
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default CustomerForm;
