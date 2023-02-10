import express, { Request, Response } from 'express';
import { OrdersDB } from '../models/model';
import { Order } from '../models/types';
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

//Add a filter to say "groupby userId"
router.get('/orders');