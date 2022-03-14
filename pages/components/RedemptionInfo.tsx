import React from 'react'
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const rows = [
  { points: 150, rewards: '10% Discount' },
  { points: 200, rewards: 'Free Earrings' },
  { points: 250, rewards: '15% Discount' },
  { points: 400, rewards: '$70 Voucher' },
];

function RedemptionInfo() {
  return (
    <Container>
      <Typography variant='h3' sx={{my: '1rem'}}>Options of Redemption</Typography>
      <Typography variant='body1' sx={{ mb: '2rem'}}>$1 Spent = 1 Point Earned</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Points</TableCell>
            <TableCell>Rewards</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.points}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.rewards}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>  
      </Table>
    </TableContainer>


    </Container>
  )
}

export default RedemptionInfo