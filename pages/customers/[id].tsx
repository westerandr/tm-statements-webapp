import React from 'react';
import { database } from '../../config/firebase';
import { collection, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { Container, Typography } from '@mui/material';
import { Customer as CustomerType } from '../../lib/types';
import RedemptionInfo from '../components/RedemptionInfo';
import Navbar from '../components/Navbar';

const customersCollection = collection(database, 'users');

type CustomerProps = {
  customer: CustomerType
}

function Customer({ customer } : CustomerProps) {

  return (
    <>
      <Navbar />
      <Container sx={{py: '2rem'}} maxWidth="lg">
        <Typography variant="h1" sx={{my: '1rem', fontSize: '3.5rem'}}>{`${customer.firstName} ${customer.lastName}`}</Typography>
        <Typography variant="h2" color="secondary" sx={{mb: '1rem', fontSize: '2rem'}}>{`@${customer.handle}`}</Typography>
        <Typography variant="body1" sx={{mt: '1rem', fontSize: '1.5rem'}}>{`Total Amount Spent: $${customer.amountSpent}`}</Typography>
        <Typography variant="body1" sx={{mt: '1rem', mb: '5rem', fontSize: '1.5rem'}}>{`Current Points: ${customer.currentPoints}`}</Typography>
        <Typography variant="h2" sx={{mb: '1rem', fontSize: '2.8rem'}}>Redemption Info</Typography>
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


    return {
      props: {
        customer
      }
    }

}


export default Customer
