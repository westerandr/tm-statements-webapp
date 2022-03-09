import { useState, useEffect } from 'react'
import { database } from '../../config/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Container, Typography, List, ListItem } from '@mui/material';
import { Customer } from '../../lib/types';
import { CircularProgress } from '@mui/material';

const customersCollection = collection(database, 'users');

function CustomerList() {
  const [ users, usersloading, userserror ] = useCollection(customersCollection, { });
  console.log(users?.docs, usersloading, userserror)
  return (
    <Container>
        <Typography variant="h6" gutterBottom>Customers</Typography>
        { usersloading ? <CircularProgress /> : <></>}
        <List >
        {
          users && !users.empty && users.docs.map((doc: any) => {
            const customer: Customer = doc.data();
            console.log(customer);
            return (
          
                <ListItem key={customer?.uid}>
                  {customer?.firstName} {customer?.lastName}
                </ListItem>
            
            )
          })
        }
        </List>
    </Container>
  )
}

export default CustomerList