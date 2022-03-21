import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from '../lib/context/userContext'; 
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Copyright from './components/Copyright';
import Navbar from './components/Navbar';
import Customers from './components/Customers';
import Orders from './components/Orders';


const Home: NextPage = () => {
  const router = useRouter();
  const { authUser, loading } = useAuth();
  useEffect(() => {
    if (!authUser) {
      router.replace('/login');
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  if (loading) {
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
          <Customers />
          <Divider sx={{my:'2rem'}} light />
          <Orders />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </>
  );
};

export default Home;
