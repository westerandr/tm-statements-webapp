import React from 'react'
import { database } from '../../config/firebase';
import { collection } from 'firebase/firestore';

const customersCollection = collection(database, 'users');

function Customer() {

  return (
    <div>
      <h1>Customer ID</h1>
    </div>
  )
}


export default Customer
