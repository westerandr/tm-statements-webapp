import React from 'react'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { database } from '../../config/firebase';
import { addDoc, updateDoc, collection, Timestamp, doc } from 'firebase/firestore';
import { Customer, } from '../../lib/types';
import { useAuth } from '../../lib/context/userContext';
import { toast } from 'material-react-toastify';

const redemptionCollection = collection(database, 'redemptions');
const customersCollection = collection(database, 'users');

const rows = [
  { points: 150, rewards: '10% Discount' },
  { points: 200, rewards: 'Free Earrings' },
  { points: 250, rewards: '15% Discount' },
  { points: 400, rewards: '$70 Voucher' },
];

type RedemptionInfoProps = {
  customer: Customer;
}

function RedemptionInfo({ customer }: RedemptionInfoProps) {
  const { authUser } = useAuth();

  const claimRedemption = async (cost: number, reward: string) => {
    if(authUser){
      if(cost > customer.currentPoints){
        toast.error(`${customer.firstName} does not have enough points to redeem this item.`, { type: 'error' });
      } else {
        const result = await addDoc(redemptionCollection, {
          pointsDeducted: cost,
          reward: reward,
          user: customer.uid,
          used: false,
          created: Timestamp.now(),
        });

        if(result){
          const customerDoc = doc(customersCollection, customer.uid);
          updateDoc(customerDoc, {
            currentPoints: Number(customer.currentPoints) - cost,
          });
          toast.success(`${customer.firstName} redeemed ${reward} successfully.`, { type: 'success' });
        }
      }
    }
  }

  return (
    <>
      <Typography variant='body1' sx={{ mb: '2rem'}}>$1 Spent = 1 Point Earned</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: 'teal'}}>
            <TableCell sx={{color: 'white'}}>Points</TableCell>
            <TableCell sx={{color: 'white'}}>Rewards</TableCell>
            { authUser && customer.currentPoints >= rows[0].points && <TableCell></TableCell>}
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

              { authUser  && customer.currentPoints >= rows[0].points &&
                <TableCell  component="th" scope="row">
                  { customer.currentPoints >= row.points && <Button onClick={() => claimRedemption(row.points, row.rewards)} color="secondary" variant="contained">Redeem</Button> }
                </TableCell>
              }

            </TableRow>
          ))}
        </TableBody>  
      </Table>
    </TableContainer>


    </>
  )
}

export default RedemptionInfo