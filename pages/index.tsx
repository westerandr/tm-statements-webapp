import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from '../lib/context/userContext'; 
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from './components/Link';
import Copyright from './components/Copyright';
import Navbar from './components/Navbar';
import Customers from './components/Customers';


const Home: NextPage = () => {
  const router = useRouter();
  const { authUser } = useAuth();
  useEffect(() => {
    if (!authUser) {
      router.replace('/login');
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

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
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Home;
