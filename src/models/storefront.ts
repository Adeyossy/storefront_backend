import db from "../db/db"
import { Product } from "./types";

export class ProductsDB {
  queryProcessor = async (query: string): Promise<Product[]> => {
    try {
      const connection = await db.connect();
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  getIndex = async (): Promise<Product[]> => {
    try {
      return this.queryProcessor('SELECT * FROM products;');
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  showProduct = async (productId: string): Promise<Product[]> => {
    try {
      return this.queryProcessor(`SELECT * FROM products WHERE id=${productId};`);
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }

  createProduct = async (product: Product): Promise<Product[]> => {
    try {
      return this.queryProcessor(`INSERT INTO products (id, name, price, category) 
      VALUES (${product.name}, ${product.price}, ${product.category});`);
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }
}