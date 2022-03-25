import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '@mui/material';
import { database } from '../../config/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Redemption } from '../../lib/types';
import { toast } from 'material-react-toastify';
import { useAuth } from '../../lib/context/userContext';

const redemptionCollection = collection(database, 'redemptions');

type RewardsProps = {
  redemptions: Redemption[];
}

function Rewards({redemptions}: RewardsProps) {
  const { authUser } = useAuth();

  const redeem = async (uid: string) => {
    const redemptionDoc = await doc(redemptionCollection, uid);
    await updateDoc(redemptionDoc, {
      used: true,
    });
    toast.success(`Redeemed successfully.`, { type: 'success' });
    window.location.reload();
  }

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ backgroundColor: 'teal'}}>
          <TableCell sx={{ color: 'white'}}>Date</TableCell>
          <TableCell sx={{ color: 'white'}}>Reward</TableCell>
          <TableCell sx={{ color: 'white'}}>Points Deducted</TableCell>
          <TableCell sx={{ color: 'white'}}>Used</TableCell>
          {authUser && <TableCell></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
       {redemptions && redemptions.map((redemption) => (
          <TableRow
            key={redemption.uid}
          >
            <TableCell component="th" scope="row">
              {redemption.created.toDateString()}
            </TableCell>
            <TableCell>{redemption.reward}</TableCell>
            <TableCell>{redemption.pointsDeducted}</TableCell>
            <TableCell>{redemption.used ? <CheckIcon sx={{ color: 'green' }} />  : <ClearIcon sx={{ color: 'red'}} />}</TableCell>
          {authUser  && <TableCell>
            
            {!redemption.used && <Button color="secondary" variant="contained" onClick={() => redeem(redemption.uid)}>Redeem</Button>}
            </TableCell>}

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Rewards;