import { useState, ChangeEvent } from 'react'
import { TextField, FormControl, Typography, Button, Container } from '@mui/material';

const initialState = {
  firstName: '',
  lastName: '',
  handle: '',
  amountSpent: 0,
  currentPoints: 0,
};

function CustomerForm() {
  const [customer, setCustomer] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  return (
   <Container>
      <form>
        <Typography variant="h6" gutterBottom>New Customer</Typography>
        <FormControl sx={{marginBottom: '1rem'}} fullWidth>
          <TextField id="outlined-basic" label="First Name" variant="outlined" name="firstName" onChange={handleChange} />
        </FormControl>
        <FormControl sx={{marginBottom: '1rem'}} fullWidth>
          <TextField id="outlined-basic" label="Last Name" variant="outlined" name="lastName" onChange={handleChange} />
        </FormControl>
        <FormControl  sx={{marginBottom: '1rem'}} fullWidth>
          <TextField id="outlined-basic" label="Instagram Handle" variant="outlined" name="handle" onChange={handleChange} />
        </FormControl>
        <FormControl sx={{marginBottom: '1rem'}} fullWidth>
          <Button variant='contained' color="secondary">Add</Button>
        </FormControl>
      </form>
   </Container>
  )
}

export default CustomerForm;