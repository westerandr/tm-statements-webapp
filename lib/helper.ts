import { Order } from './types';
import dayjs from 'dayjs';
export const getOrderChartData = (orders: Order[] | undefined) => {
  if(!orders) return [];
  const today = dayjs(new Date());

  // get the last 7 days
  const days = Array.from(Array(7).keys()).map(i => today.subtract(i, 'day'));
  const lastDay = days[days.length - 1];
  orders = orders.filter (order => {
    const orderDate = dayjs(order.created);
    return orderDate.isAfter(lastDay, 'day');
  });

  const chartData = days.map(day => {
    const dayOrders = orders?.filter(order => {
      const orderDate = dayjs(order.created);
      return orderDate.isSame(day, 'day');
    });
    return {
      day: day.format('DD MMM'),
      sales: dayOrders?.length || 0
    };
  }).reverse();

  return chartData
  
}