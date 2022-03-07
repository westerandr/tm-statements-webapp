import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from './components/Copyright';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/context/userContext';
import useFirebaseAuth from '../lib/hooks/useFirebaseAuth';

export default function Login() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { signIn } = useFirebaseAuth();

  React.useEffect(() => {
    if (authUser) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    if(!email || !password) return;
    try{
      const userCredentials = await signIn(email, password);
    
      if(userCredentials){
        router.push('/');
      }
    } catch(error: any){
      console.log('Error: ', error?.message);
    }
  
  };

  return (

      <Container component="main" maxWidth="xs">
 
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar alt="TM Statements Logo" src="/logo.jpg" sx={{ width:100, height: 100, border: '1px #ccc solid', mb: 2}}   />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

  );
}