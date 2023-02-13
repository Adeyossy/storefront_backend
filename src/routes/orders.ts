import express, { Request, Response } from 'express';
import { OrdersDB } from '../models/model';
import { Order, OrderProduct } from '../models/types';
import { verifyToken } from './middleware';

const router = express.Router();

router.get('/orders/:userId', verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if(userId) {
    const ordersModel = new OrdersDB('orders');
    const orders = <Order[]> await ordersModel.showEntity(parseInt(userId));
    res.json(orders[0]);
  }

  res.send('Invalid userId');
});

router.post('/orders/:orderId/products', verifyToken, async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  if(orderId) {
    if(req.body.quantity && req.body.orderId && req.body.productId) {
      const ordersModel = new OrdersDB('orders');
      const addedProduct = <OrderProduct[]> await ordersModel.addProductToOrder
      (req.body.quantity, req.body.orderId, req.body.productId);
      res.status(201).json(addedProduct[0]);
    }

    res.send('Invalid order');
  }

  res.send(`Order with ID ${orderId} is invalid`);
});

//Add a filter to say "groupby userId"
router.get('/orders');