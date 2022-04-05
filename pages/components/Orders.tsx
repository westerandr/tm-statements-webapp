import { useState, useEffect } from 'react'
import { database } from '../../config/firebase';
import { Container, Grid } from '@mui/material';
import OrderForm from './OrderForm';
import OrderHistory from './OrderHistory';
import { DocumentData, QuerySnapshot, collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { Customer, Order } from '../../lib/types';

type OrdersProps = {
  customerDocs: QuerySnapshot<DocumentData> | undefined;
  customersLoading: boolean;
}

const ordersCollection = collection(database, 'orders');

function Orders({ customerDocs, customersLoading }: OrdersProps) {
  const [ customers, setCustomers ] = useState<any>([]);
  const [ orders, setOrders ] = useState<Order[] | undefined>(undefined);

  const addNewOrder = (order: Order) => {
    setOrders([order, ...orders!]);
  }

  const fetchAndSetOrders = async () => {
    const q = query(ordersCollection, orderBy('created', 'desc'));
    const snapshot = await getDocs(q);
    const fetchedOrders: Order[] = [];
    snapshot.docs.map(doc => {
      const data = doc.data();
      fetchedOrders.push({
        amount: data.amount,
        items: data.items,
        user: data.user,
        paid: data.paid,
        created: data.created.toDate(),
        uid: doc.id,
      } as Order);
    });
    setOrders(fetchedOrders);
  }

  useEffect(() => {
    const customerDocsArray = customerDocs?.docs.map(doc => {
      return {
        ...doc.data(),
        uid: doc.id
      } as Customer
    });

    fetchAndSetOrders();
    setCustomers(customerDocsArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  

  if(customersLoading) {
    return <></>
  }

  return (
    <Container>
    <Grid container spacing={5}>
      <Grid item xs={12}><OrderForm customers={customers} addOrder={addNewOrder} /></Grid>
      <Grid item xs={12}><OrderHistory orders={orders} customers={customers} singleUser={false} /></Grid>
    </Grid>
  </Container>
  )
}

export default Orders