import { Schema, model } from 'mongoose';
import { productModel } from '../../src/types/interfaces';

const productSchema = new Schema<productModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sale: { type: Boolean, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  inStock: { type: Number, required: true },
  src: { type: String, required: true },
  additionalPhotos: { type: [String], required: true },
});

export const Product = model<productModel>('Product', productSchema);