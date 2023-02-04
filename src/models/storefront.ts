import db from "../db/db"

export type Product = {
  id: number,
  name: string,
  price: number,
  category: string
}

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
      return this.queryProcessor('SELECT * FROM products');
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }
}