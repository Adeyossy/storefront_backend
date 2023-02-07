import db from "../db/db";
import { ProductsDB } from "./storefront";
import { Order, User } from "./types";
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
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  getIndex = async <Type>(): Promise<Type[]> => {
    try {
      return this.queryProcessor(`SELECT * FROM $1`, [this.table]);
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  showEntity = async <Type>(id: number): Promise<Type[]> => {
    try {
      return this.queryProcessor(`SELECT * FROM $1 WHERE id=$2`, [this.table, id]);
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  createEntity = async <Type>(entity: Type): Promise<Type[]> => {
    try {
      const values = [this.table, Object.keys(entity as object).join(", "),
      Object.values(entity as object).join(", ")]

      return this.queryProcessor(`INSERT INTO $1 ($2) VALUES ($3)`, values);

    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }
}


// Superclass of ModelDB for Orders database
export class OrdersDB extends ModelDB {
  getCurrentOrderByUser = (userId: number): Promise<Order[]> => {
    return this.queryProcessor(`SELECT * FROM orders WHERE user_id=$1`, [userId]);
  }

  getCompletedOrdersByUser = (userId: string): Promise<Order[]> => {
    return this.queryProcessor(`SELECT * FROM orders WHERE user_id=$1 AND 
    orderStatus='completed'`, [userId]);
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
    $1 WHERE username=$2`, [this.table, username]);

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