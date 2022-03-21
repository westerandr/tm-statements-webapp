import React from 'react'
import { Container, Grid } from '@mui/material';
import OrderForm from './OrderForm';
import OrderHistory from './OrderHistory';

function Orders() {
  return (
    <Container>
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}><OrderForm /></Grid>
      <Grid item xs={12} md={6}><OrderHistory /></Grid>
    </Grid>
  </Container>
  )
}

export default Orders