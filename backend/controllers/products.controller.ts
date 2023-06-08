import { Product } from '../models/products.model';
import { RequestHandler } from 'express';

export const getAll: RequestHandler = async (req, res) => {
  try {
    const result = await Product.find();
    if(!result) res.status(404).json({ product: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

export const getOneProduct: RequestHandler = async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);
    if(!result) res.status(404).json({ product: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};