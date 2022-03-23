import { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material';
import OrderForm from './OrderForm';
import OrderHistory from './OrderHistory';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Customer } from '../../lib/types';


type OrdersProps = {
  customerDocs: QuerySnapshot<DocumentData> | undefined;
  customersLoading: boolean;
}

function Orders({ customerDocs, customersLoading }: OrdersProps) {
  const [ customers, setCustomers ] = useState<any>([]);

  useEffect(() => {
    const customerDocsArray = customerDocs?.docs.map(doc => {
      return {
        ...doc.data(),
        uid: doc.id
      } as Customer
    });
  
    setCustomers(customerDocsArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  

  if(customersLoading) {
    return <></>
  }

  return (
    <Container>
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}><OrderForm customers={customers} /></Grid>
      <Grid item xs={12} md={6}><OrderHistory /></Grid>
    </Grid>
  </Container>
  )
}

export default Orders