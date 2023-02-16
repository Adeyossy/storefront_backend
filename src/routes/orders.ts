import express, { Request, Response } from 'express';
import { OrdersDB } from '../models/model';
import { Order, OrderProduct } from '../models/types';
import { verifyToken } from './middleware';

const router = express.Router();

router.post('/orders/:userId', verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (userId) {
    const ordersModel = new OrdersDB('orders');
    try {
      const newOrder = <Order[]>await ordersModel.createEntity({
        user_id: parseInt(userId),
        order_status: 'active'
      });

      res.status(201).json(newOrder[0]);
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  }

  res.status(400).json('Invalid request');
})

router.get('/orders/:userId', verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (userId) {
    const ordersModel = new OrdersDB('orders');
    try {
      const orders = <Order[]>await ordersModel.getCurrentOrderByUser(parseInt(userId));
      res.json(orders);
      return;
    } catch (error) {
      res.status(500).json(error);
      return;
    }
  }

  res.send('Invalid userId');
});

router.post('/orders/:orderId/products', verifyToken, async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  if (orderId) {
    if (req.body.quantity && req.body.orderId && req.body.productId) {
      const ordersModel = new OrdersDB('orders');
      try {
        const addedProduct = <OrderProduct[]>await ordersModel.addProductToOrder
          (req.body.quantity, req.body.orderId, req.body.productId);
        res.status(201).json(addedProduct[0]);
        return;
      } catch (error) {
        res.status(500).json(error);
        return;
      }
    }

    res.status(400).json('Invalid order');
  }

  res.status(400).json(`Order with ID ${orderId} is invalid`);
});

export default router;
