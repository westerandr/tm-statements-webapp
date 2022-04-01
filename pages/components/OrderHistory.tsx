import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React from 'react'
import { Customer, Order } from '../../lib/types';

type OrderHistoryProps = {
  orders: Order[] | null;
  customers: Customer[];
  singleUser: boolean;
}

function OrderHistory({orders, customers, singleUser}: OrderHistoryProps) {
  const getCustomerName = (uid: string) => {
    const customer = customers.find(customer => customer.uid === uid);
    if(!customer) return 'N/A';
    return `${customer.firstName} ${customer.lastName}`;
  }

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ backgroundColor: 'teal'}}>
          <TableCell sx={{color:'white'}}>Date</TableCell>
          { !singleUser && <TableCell sx={{color:'white'}}>User</TableCell>}
          <TableCell sx={{color:'white'}}>Items</TableCell>
          <TableCell sx={{color:'white'}}>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders && orders?.map((order) => (
          <TableRow
            key={order.uid}
          
          >
            <TableCell component="th" scope="row">
              {order?.created?.toDateString()}
            </TableCell>
            { !singleUser && <TableCell>{getCustomerName(order.user)}</TableCell>} 
            <TableCell>
              <ul>
              {
              
              order.items.split(',').map((item, index) => (
                 <li key={index}>{item}</li>
               ))
               
             }
              </ul>
              </TableCell>
            <TableCell>$ {order.amount}</TableCell>
      

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default OrderHistory