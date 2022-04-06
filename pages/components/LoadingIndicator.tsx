import { Container, CircularProgress } from '@mui/material';

export default function LoadingIndicator(){
  return (<Container sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>
      <CircularProgress />
    </Container>)
}