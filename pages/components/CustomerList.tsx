import { useRouter } from 'next/router'
import { database } from '../../config/firebase';
import { collection, DocumentSnapshot, doc, deleteDoc, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Container, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton, CircularProgress } from '@mui/material';
import { Customer } from '../../lib/types';
import PageViewIcon  from '@mui/icons-material/Pageview';
import EditIcon  from '@mui/icons-material/Edit';
import DeleteIcon  from '@mui/icons-material/Delete';
import { toast } from 'material-react-toastify';
import { useConfirmDialog } from 'react-mui-confirm';

type CustomerListProps = {
  customers: QuerySnapshot<DocumentData> | undefined;
  customersLoading: boolean;
  setMode: (mode: string, customer: Customer) => void;
}

const customersCollection = collection(database, 'users');

function CustomerList({ customers, customersLoading, setMode } : CustomerListProps) {
  
  const router = useRouter();
  const confirm = useConfirmDialog();

  const viewCustomer = (uid: string) => {
    router.push(`/customers/${uid}`);
  }

  const confirmDeletion = (uid: string, handle: string) => {
    confirm({
      title: 'Delete Customer',
      description: `Are you sure you want to delete ${handle}?`,
      onConfirm: async () => {
        deleteDoc(doc(customersCollection, uid))
          .then(() => toast.success(`Customer - ${handle} deleted`))
          .catch(() => toast.error('Error deleting customer'));
      }
    })
  };


  if(customersLoading) {
    return <CircularProgress />
  }

  return (
    <Container>
        <Typography variant="h6" gutterBottom>Customers</Typography>
       
        <List >
        {
          customers && !customers.empty && customers.docs.map((doc: DocumentSnapshot) => {
            const data : any = doc.data();
            const customer : Customer = { ...data, uid: doc.id };

            return (
          
                <ListItem key={customer?.uid}>
                  <ListItemText
                    primary={`${customer?.firstName} ${customer?.lastName}`}
                    secondary={`@${customer?.handle}`}
                  />
                  <ListItemIcon>
                    <IconButton onClick={() => viewCustomer(doc?.id)}>
                      <PageViewIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <IconButton onClick={() => setMode('edit', customer)}>
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <IconButton onClick={() => confirmDeletion(customer?.uid, customer.handle)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                  
                </ListItem>
            
            )
          })
        }
        { customers?.empty && <Typography variant="body1">No customers, use the form to create one!</Typography> }
        </List>
    </Container>
  )
}

export default CustomerList