import React from 'react';
import { database } from '../../config/firebase';
import { collection, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { Container } from '@mui/material';
import { Customer as CustomerType } from '../../lib/types';

const customersCollection = collection(database, 'users');

type CustomerProps = {
  customer: CustomerType
}

function Customer({ customer } : CustomerProps) {

  return (
    <Container maxWidth="lg">
      <h1>{customer?.handle}</h1>
    </Container>
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
