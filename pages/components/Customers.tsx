import { useState, useRef } from 'react'
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import Container from '@mui/material/Container';
import { Customer } from '../../lib/types';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

type CustomersProps = {
  customers: QuerySnapshot<DocumentData> | undefined;
  customersLoading: boolean;
}

function Customers({ customers, customersLoading }: CustomersProps) {  
  const [mode, setMode] = useState('create');
  const customerFormRef = useRef(null);
  const scrollToForm = () => {
    if(customerFormRef.current) {
      (customerFormRef.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
    }
  }
  const [customer, setCustomer] = useState({
    uid: '',
    firstName: '',
    lastName: '',
    handle: '',
    amountSpent: 0,
    currentPoints: 0
  });

  const handleModeChange = (mode: string, customer: Customer) => {
    setMode(mode);
    setCustomer(customer);
  }

  return (
    <Container>
      <CustomerList customers={customers} customersLoading={customersLoading} setMode={handleModeChange} scrollToForm={scrollToForm}/>
      <div ref={customerFormRef}>
        <CustomerForm mode={mode} setMode={handleModeChange} editableCustomer={customer} />
      </div>
    </Container>

  )
}

export default Customers;



      