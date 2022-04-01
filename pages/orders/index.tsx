import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from '../../lib/context/userContext'; 
import { useRouter } from 'next/router';
import { database } from '../../config/firebase';
import  { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';
import OrdersComponent from '../components/Orders';



const customersCollection = collection(database, 'users');

const Orders: NextPage = () => {
  const router = useRouter();
  const { authUser, loading } = useAuth();
  const q = query(customersCollection, orderBy('firstName') );
  const [ users, usersloading ] = useCollection(q, { });

  useEffect(() => {
    if (!authUser) {
      router.replace('/login');
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  if (loading || usersloading) {
    return <></>;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <OrdersComponent customerDocs={users} customersLoading={usersloading}  />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </>
  );
};

export default Orders;