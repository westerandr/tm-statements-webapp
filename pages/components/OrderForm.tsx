import { ChangeEvent, FormEvent, useState } from 'react'
import { Container, Grid, Typography, Button, FormControl, TextField, InputAdornment, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const initState = {
  amount: 0,
  items: "",
  user: "",
}

function OrderForm() {
  const [order, setOrder] = useState(initState);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  }

  const handleSelect = (e: SelectChangeEvent<string>) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setOrder(initState);
  }

  return (
    <Container maxWidth="lg">
       <form onSubmit={onSubmit}>
        <Grid container sx={{mb: '1rem'}}>
          <Grid item xs={12} md={6} justifyContent="start">
            <Typography variant="h6" gutterBottom>
              Create Order
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="end">
          <Button onClick={clearForm} color="secondary">
            Clear
          </Button>
          </Grid>
        </Grid>

        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
        <InputLabel id="customer-label">Customer</InputLabel>
        <Select
          label="Customer"
          labelId="customer-label"
          name="user"
          variant='outlined'
          value={order.user}
          onChange={handleSelect}
          placeholder='Select Customer'
         
        >
          {/* {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))} */}
        </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Items"
            variant="outlined"
            name="items"
            minRows={3}
            multiline
            value={order.items}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
            name="amount"
            value={order.amount}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
          <Button type='submit' variant="contained" color="secondary">
            Create Order
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}

export default OrderForm