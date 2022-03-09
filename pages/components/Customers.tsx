import React from 'react'
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Customers() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6}><CustomerForm /></Grid>
        <Grid item xs={12} md={6}><CustomerList /></Grid>
      </Grid>
    </Container>

  )
}

export default Customers;



      