import supertest from "supertest";
import { ModelDB, OrdersDB, UsersDB } from "../models/model";
import app from '../server';
import { Order, OrderProduct, Product, User } from '../models/types';
import jwt from 'jsonwebtoken';

const request = supertest(app);

const user = {
  username: 'newshopper',
  password: 'reppohswen'
};

describe('This suite tests orders model', function () {
  it('beginning with creating a new order', async function () {
    const signup = await request.post('/users/signup').send(user);

    const newUser = (jwt.decode(signup.body) as User);
    const ordersModel = new OrdersDB('orders');
    const productsModel = new ModelDB('products');

    // Create a new Product - a safety measure just in case no order exists
    // for this test
    const newProduct = <Product[]> await productsModel.createEntity({
      name: 'Chapman', 
      price: 500, 
      category: 'Beverage'
    });

    const newOrder = <Order[]> await ordersModel.createEntity(
      { user_id: newUser.id, order_status: 'active' });
    
    if (newOrder[0].id) {
      // Add first product to the order
      const addedProduct = await ordersModel.addProductToOrder(2, 
        newOrder[0].id, newProduct[0].id as number);
      expect(addedProduct.length).toBe(1);
    }
  });
});

describe('This suite tests orders route:', function () {
  it('GET /orders/:userId', async function () {
    const login = await request.post('/users/login').send(user);

    const userId = (jwt.decode(login.body) as User).id;

    if(userId) {
      const ordersModel = new OrdersDB('orders');
      const orders = <Order[]> await ordersModel.getCurrentOrderByUser(userId);
      
      expect(Array.isArray(orders)).toBeTrue();
      // expect(response.status).toBe(201);
    }
  });
});

describe('This suite sequentially tests the models for orders', function(){
  it('beginning with creating an order', async function() {
    const ordersModel = new OrdersDB('orders');
    const newOrder = <Order[]> await ordersModel.createEntity({
      user_id: 1, order_status: 'active'
    });
    expect(newOrder.length).toBe(1);
  });

  it('then adds a product to the new order', async function(){
    const orderProductsModel = new ModelDB('order_products');
    const newOrderProducts = <OrderProduct[]> await orderProductsModel.createEntity({
      quantity: 1, order_id: 1, product_id: 1
    });
    expect(Array.isArray(newOrderProducts)).toBeTrue();
  });

  it('then gets the current order by user', async function(){
    const ordersModel = new OrdersDB('orders');
    const currentOrderByUser = await ordersModel.getCurrentOrderByUser(1);
    expect(currentOrderByUser.length).toBeTruthy();
  });
});
