import supertest from "supertest";
import { OrdersDB, UsersDB } from "../models/model";
import app from '../server';
import {Order, User} from '../models/types';

const request = supertest(app);

const user = {
  username: 'newshopper',
  password: 'reppohswen'
};

describe('This suite tests orders route:', function () {
  it('GET /orders/:userId', async function () {
    const signup = await request.post('/users').send(user);

    const response = await request.get('/orders/:userId')
      .set('Authorization', `Bearer ${signup.body}`);
    console.log('orders/:userId response => ', response.body);
    // expect(Array.isArray(response.body)).toBeTrue();
    expect(response.status).toBe(201)
  });
});

describe('This suite tests orders model', function () {
  it('beginning with creating a new order', async function() {
    const ordersModel = new OrdersDB('orders');
    const usersModel = new UsersDB('users');
    const loggedInUser = <User> await usersModel.authenticateUser(user.username, user.password);
    const newOrder = <Order[]> await ordersModel.createEntity({user_id: loggedInUser.id, order_status: 'active'});
    if (newOrder[0].id) {
      const addedProduct = await ordersModel.addProductToOrder(2, 1, 1);
      expect(addedProduct.length).toBe(1);
    }
  });
});
