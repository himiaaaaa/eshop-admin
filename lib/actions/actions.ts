import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../mongoDB"

export const getTotalSales = async () => {

  await connectToDB();

  const orders = await Order.find()

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)

  return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {

  await connectToDB();

  const customers = await Customer.find()
  const totalCustomers = customers.length

  return totalCustomers
}

export const getSalesPerMonth = async () => {


  await connectToDB();


  const orders = await Order.find();


  const salesPerMonth: { [key: number]: number } = {};


  for (const order of orders) {
    const monthIndex = new Date(order.createdAt).getMonth(); 

    if (salesPerMonth[monthIndex]) {
      salesPerMonth[monthIndex] += order.totalAmount;
    } else {
      salesPerMonth[monthIndex] = order.totalAmount;
    }
  }


  const graphData = Array(12).fill(0).map((_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i)); // Get the short name of the month
    return {
      name: month,
      sales: salesPerMonth[i] || 0,
    };
  });

  return graphData;
};

