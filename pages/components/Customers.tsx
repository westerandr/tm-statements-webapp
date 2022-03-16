import { useState } from 'react'
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Customer } from '../../lib/types';

function Customers() {  
  const [mode, setMode] = useState('create');
  const [customer, setCustomer] = useState({
    uid: '',
    firstName: '',
    lastName: '',
    handle: '',
    amountSpent: 0,
    currentPoints: 0
  });

  const handleModeChange = (mode: string, customer: Customer) => {
    setMode(mode);
    setCustomer(customer);
  }

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}><CustomerForm mode={mode} setMode={handleModeChange} editableCustomer={customer} /></Grid>
        <Grid item xs={12} md={6}><CustomerList setMode={handleModeChange} /></Grid>
      </Grid>
    </Container>

  )
}

export default Customers;



      