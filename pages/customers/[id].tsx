import React from 'react';
import { database } from '../../config/firebase';
import { collection, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc, getDocs, where, query, orderBy } from 'firebase/firestore';
import { Container, Typography } from '@mui/material';
import { Customer as CustomerType, Redemption } from '../../lib/types';
import RedemptionInfo from '../components/RedemptionInfo';
import OrderHistory from '../components/OrderHistory';
import Navbar from '../components/Navbar';
import Rewards from '../components/Rewards';

const customersCollection = collection(database, 'users');
const ordersCollection = collection(database, 'orders');
const redemptionsCollection = collection(database, 'redemptions');

type CustomerProps = {
  customer: CustomerType;
  orders: any[];
  redemptions: any[];
}

function Customer({ customer, orders, redemptions } : CustomerProps) {

  // change date string back to date
  orders = orders.map((order) => {
    order.created = new Date(order.created);
    return order;
  });

  // change date string back to date
  redemptions = redemptions.map((redemption) => {
    redemption.created = new Date(redemption.created);
    return redemption;
  });

  return (
    <>
      <Navbar />
      <Container sx={{py: '2rem'}} maxWidth="lg">
        <Typography variant="h1" sx={{my: '1rem', fontSize: '3.5rem'}}>{`${customer.firstName} ${customer.lastName}`}</Typography>
        <Typography variant="h2" color="secondary" sx={{mb: '1rem', fontSize: '2rem'}}>{`@${customer.handle}`}</Typography>
        <Typography variant="body1" sx={{mt: '1rem', fontSize: '1.5rem'}}>{`Total Amount Spent: $${customer.amountSpent}`}</Typography>
        <Typography variant="body1" sx={{mt: '1rem', mb: '3rem', fontSize: '1.5rem'}}>{`Current Points: ${customer.currentPoints}`}</Typography>
        <Typography variant="h2" sx={{mb: '1rem', fontSize: '2.8rem'}}>Order History</Typography>
        <OrderHistory orders={orders} customers={[customer]} singleUser />
        {redemptions.length > 0 && (
          <>
          <Typography variant="h2" sx={{mb: '1rem', mt: '3rem', fontSize: '2.8rem'}}>Rewards</Typography>
          <Rewards redemptions={redemptions} />
          </>
        )}

        <Typography variant="h2" sx={{mb: '1rem', mt: '3rem', fontSize: '2.8rem'}}>Redemption Info</Typography>
        <RedemptionInfo customer={customer} />
      </Container>
    </>
  )
}

export async function getServerSideProps(context : any) {
  const { id } = context.query;
  // get customer document by id
  const docRef: DocumentReference = doc(customersCollection, id); 
  const document: DocumentSnapshot<DocumentData> = await getDoc(docRef);
  const data: any = document.data();
  const customer: CustomerType = { ...data, uid: document.id };

  // get orders for customer
  const ordersQuery = query(ordersCollection, where('user', '==', customer.uid), orderBy('created', 'desc'));
  const ordersSnapshot = await getDocs(ordersQuery);
  const orders: any = [];

  ordersSnapshot.docs.map(doc => {
    const data = doc.data();
    orders.push({
       amount: data.amount, 
       created: data.created.toDate().toISOString(), 
       items: data.items,  
       user: data.user, 
       discounted: data.discounted || false,
       uid: doc.id });
  });

  // get redemptions for customer
  const redemptionsQuery = query(redemptionsCollection, where('user', '==', customer.uid));
  const redemptionsSnapshot = await getDocs(redemptionsQuery);
  const redemptions: Redemption[] = [];

  redemptionsSnapshot.docs.map(doc => {
    const data = doc.data();
    redemptions.push({
      pointsDeducted: data.pointsDeducted,
      reward: data.reward,
      created: data.created.toDate().toISOString(),
      user: data.user,
      used: data.used,
      uid: doc.id
    } as Redemption);
  });


    return {
      props: {
        customer,
        orders,
        redemptions
      }
    }

}


export default Customer
