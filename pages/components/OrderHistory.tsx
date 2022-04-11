import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from '@mui/material';
import React from 'react'
import { Customer, Order } from '../../lib/types';

type OrderHistoryProps = {
  orders: Order[] | undefined;
  customers: Customer[];
  singleUser: boolean;
}

function OrderHistory({orders, customers, singleUser}: OrderHistoryProps) {
  const [displayedOrders, setDisplayedOrders] = React.useState(orders);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    paginate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, page, rowsPerPage]);

  const paginate = () => {
    const start = page > 0 ? page * rowsPerPage : 0;
    const end = start + rowsPerPage;
    setDisplayedOrders(orders?.slice(start, end) || []);
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <TableCell sx={{color:'white'}}>Discounted</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {displayedOrders && displayedOrders?.length < 1 && <TableRow><TableCell colSpan={4}>No orders found</TableCell></TableRow>}
        {displayedOrders && displayedOrders?.map((order) => (
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
            <TableCell>{order?.discounted ? 'Yes': 'No'}</TableCell>

          </TableRow>
        ))}
      </TableBody>  
      <TableFooter>
        <TableRow>
        <TablePagination
          count={orders?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}  />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
  )
}

export default OrderHistory