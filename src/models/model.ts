import db from "../db/db";
import { ProductsDB } from "./storefront";
import { Order, OrderProduct, Product, User } from "./types";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Base class for creating database models
export class ModelDB {
  table: string;

  constructor(table: string) {
    this.table = table;
  }

  queryProcessor = async <Type>(query: string, values: Array<number | string>)
    : Promise<Type[]> => {
    try {
      const connection = await db.connect();
      const result = await connection.query(query, values);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  getIndex = async <Type>(): Promise<Type[]> => {
    try {
      return this.queryProcessor(`SELECT * FROM ${this.table}`, []);
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  showEntity = async <Type>(id: number): Promise<Type[]> => {
    try {
      return this.queryProcessor(`SELECT * FROM ${this.table} WHERE id=$1`, [id]);
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  createEntity = async <Type>(entity: Type): Promise<Type[]> => {
    try {
      const columnNames = Object.keys(entity as object).join(", ");
      const columnValues = Object.values(entity as object);

      return this.queryProcessor(`INSERT INTO ${this.table} (${columnNames}) 
      VALUES (${columnValues.map((_val, i) => `$${i+1}`).join(', ')}) RETURNING *`, columnValues);

    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }
}


// Superclass of ModelDB for Orders database
export class OrdersDB extends ModelDB {
  createOrderProducts = (orderProduct: OrderProduct): Promise<OrderProduct[]> => {
    return this.queryProcessor(`INSERT INTO order_products (quantity)`, 
    [orderProduct.quantity, orderProduct.order_id, orderProduct.product_id])
  }

  getCurrentOrderByUser = (userId: number): Promise<Order[]> => {
    return this.queryProcessor(`SELECT * FROM order_products INNER JOIN
    products ON order_products.product_id = products.id WHERE 
    product.user_id=$1`, [userId]);
  }

  getCompletedOrdersByUser = (userId: number): Promise<Order[]> => {
    return this.queryProcessor(`SELECT * FROM orders WHERE user_id=$1 AND 
    orderStatus='completed'`, [userId]);
  }

  addProductToOrder = (quantity: number, orderId: number, productId: number): Promise<OrderProduct[]> => {
    return this.queryProcessor(`INSERT INTO order_products (quantity, order_id, product_id)
     VALUES ($1, $2, $3) RETURNING *`, [quantity, orderId, productId]);
  }
}


// Superclass for Users database model
export class UsersDB extends ModelDB {
  createNewUser = async (username: string, password: string): Promise<User | string> => {
    // Check if the user already exists
    // If so, return appropriate info
    // Otherwise, create a new user
    const passHash = await bcrypt.hash(password + process.env.PEPPRE,
      parseInt(process.env.SALTRE as string));

    const newUser = <User[]>await this.createEntity({ username, password: passHash });
    return newUser[0];
  }

  authenticateUser = async (username: string, password: string): Promise<User | string> => {
    const user = <User[]>await this.queryProcessor(`SELECT password FROM 
    ${this.table} WHERE username=$1`, [username]);

    if (user.length) {
      const isAuthenticated = await bcrypt
        .compare(password + process.env.PEPPRE, user[0].password);

      if (isAuthenticated) {
        return user[0];
      }

      return "Incorrect password";
    }

    return "User does not exist";
  }
}