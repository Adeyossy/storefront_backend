import express, { Request, Response } from 'express';
import { ModelDB } from '../models/model';
import { Product } from '../models/types';

const router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  const productsModel = new ModelDB('products');
  const products = await productsModel.getIndex();
  res.json(products);
});

router.get('/products/:productId', async (req: Request, res: Response): Promise<void> => {
  const productsModel = new ModelDB('products');
  const product = await productsModel.showEntity(String(req.params.productId));
});

router.post('/products');

export default router;