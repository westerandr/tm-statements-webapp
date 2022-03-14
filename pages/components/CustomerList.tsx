import { useState, useEffect } from 'react'
import { database } from '../../config/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Container, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton, CircularProgress } from '@mui/material';
import { Customer } from '../../lib/types';
import PageViewIcon  from '@mui/icons-material/Pageview';
import EditIcon  from '@mui/icons-material/Edit';
import DeleteIcon  from '@mui/icons-material/Delete';


const customersCollection = collection(database, 'users');

function CustomerList() {
  const [ users, usersloading, userserror ] = useCollection(customersCollection, { });

  if(usersloading) {
    return <CircularProgress />
  }

  return (
    <Container>
        <Typography variant="h6" gutterBottom>Customers</Typography>
       
        <List >
        {
          users && !users.empty && users.docs.map((doc: any) => {
            const customer: Customer = doc.data();
          
            return (
          
                <ListItem key={customer?.uid}>
                  <ListItemText
                    primary={`${customer?.firstName} ${customer?.lastName}`}
                    secondary={`@${customer?.handle}`}
                  />
                  <ListItemIcon>
                    <IconButton>
                      <PageViewIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                  
                </ListItem>
            
            )
          })
        }
        </List>
    </Container>
  )
}

export default CustomerList