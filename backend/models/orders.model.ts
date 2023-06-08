import { Schema, model } from 'mongoose';
import { OrderModel } from '../../src/types/interfaces';

const orderSchema = new Schema<OrderModel>({
  contact: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  shipping: { type: String, required: true },
  message: { type: String },
  email: { type: String, required: true },
  items: { type: [Object], required: true },
  toPay: { type: Number, required: true },
});

export const Order = model<OrderModel>('Order', orderSchema);