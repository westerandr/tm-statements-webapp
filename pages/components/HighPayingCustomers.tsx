
import React from 'react'
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Customer } from '../../lib/types';

type HighPayingCustomersProps = {
  customers: Customer[] | undefined;
}

function HighPayingCustomers({customers}: HighPayingCustomersProps) {
  customers = customers?.sort((a, b) => b.amountSpent - a.amountSpent);
  // take top 5 customers
  customers = customers?.slice(0, 5);

  return (
    <Container sx={{my:'2rem'}}>
      <Typography variant='h3'>High paying customers</Typography>
      <Container sx={{ py: '1.5rem'}}>
      {customers && customers.length > 0 ? (
        <>
           <List>
              {customers.map((customer: Customer) => (
                <ListItem key={customer.uid}>
                  <ListItemText primary={`${customer.firstName} ${customer.lastName}`} secondary={`$${customer.amountSpent}`} />
                </ListItem>
              ))}
           </List>
        </>
        ) : (
          <Typography variant='h5'>No customers found</Typography>
        )}
      </Container>
    </Container>
  )
}

export default HighPayingCustomers
