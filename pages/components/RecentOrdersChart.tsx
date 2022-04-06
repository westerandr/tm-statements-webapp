import React from 'react'
import { Container, Typography } from '@mui/material';

import { database } from '../../config/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { getOrderChartData } from '../../lib/helper';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Order } from '../../lib/types';

const ordersCollection = collection(database, 'orders');


function RecentOrdersChart() {
  const q = query(ordersCollection, orderBy('created', 'desc'));
  const [orderDocs, loading] = useCollection(q, {});

  const orders = orderDocs?.docs.map(doc => {
    return {
      ...doc.data(),
      created: doc.data().created.toDate(),
      uid: doc.id
    } as Order;
  });

  let data : any | undefined = [];
  if (!loading) {
    data = getOrderChartData(orders);
  }

  return (
    <Container sx={{my:'2rem'}}>
      <Typography variant="h3">Recent Orders</Typography>
      <Container sx={{py:'1.5rem'}}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
      </Container>
      
    </Container>
  )
}

export default RecentOrdersChart