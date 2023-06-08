import { Order } from '../models/orders.model';
import { RequestHandler } from 'express';

export const addOrder: RequestHandler = async (req, res) => {
  try {
    const { contact, address, payment, shipping, message, email, items, toPay} = req.body;
    const newOrder = new Order({ contact, address, payment, shipping, message, email, items, toPay});
    await newOrder.save();
    res.json({ orderId: newOrder._id });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

export const getOrder: RequestHandler = async (req, res) => {
  try {
    const result = await Order.findById(req.params.id);
    if(!result) res.status(404).json({ order: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};