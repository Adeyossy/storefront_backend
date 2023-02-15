import express, { Request, Response } from 'express';
import { OrdersDB } from '../models/model';
import { Order, OrderProduct } from '../models/types';
import { verifyToken } from './middleware';

const router = express.Router();

router.post('/orders/:userId', verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (userId) {
    const ordersModel = new OrdersDB('orders');
    const newOrder = <Order[]> await ordersModel.createEntity({
      user_id: parseInt(userId), 
      order_status: 'active'
    });

    res.status(201).json(newOrder[0]);
  }

  res.status(400).json('Invalid request');
})

router.get('/orders/:userId', verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if(userId) {
    const ordersModel = new OrdersDB('orders');
    const orders = <Order[]> await ordersModel.getCurrentOrderByUser(parseInt(userId));
    res.json(orders);
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

    res.status(400).send('Invalid order');
  }

  res.status(400).send(`Order with ID ${orderId} is invalid`);
});

export default router;
