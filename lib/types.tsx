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
  user: string;
}

export type Redemption = {
  uid: string;
  pointsDeducted: number;
  discount: string;
  created: Date;
  user: string;
}