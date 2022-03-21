export type Customer = {
  uid: string;
  firstName: string;
  lastName: string;
  handle: string;
  amountSpent: number;
  currentPoints: number;
}

export type Order = {
  uid: string;
  amount: number;
  created: Date;
  items: string;
  paid: boolean;
  user: string;
}