import express, { Request, Response } from 'express';
import { ModelDB } from '../models/model';
import { Product } from '../models/types';
import { verifyToken } from './middleware';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded( { extended: true } ));

router.get('/products', async (req: Request, res: Response) => {
  const productsModel = new ModelDB('products');
  const products = await productsModel.getIndex();
  res.json(products);
});

router.get('/products/:productId', async (req: Request, res: Response) => {
  const productsModel = new ModelDB('products');
  const product = <Product[]> await productsModel.showEntity(parseInt(req.params.productId));
  res.json(product[0]);
});

router.post('/products', verifyToken, async (req: Request, res: Response) => {
  const productFromClient = req.body;
  if (productFromClient.name && productFromClient.price) {
    const productModel = new ModelDB('products');
    const newProduct = <Product[]> await productModel.createEntity(productFromClient);
    res.status(201);
    res.json(newProduct[0]);
  }
});

export default router;