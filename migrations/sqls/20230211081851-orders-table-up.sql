CREATE TABLE products IF NOT EXISTS (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100), 
  price NUMERIC(5, 2), 
  category VARCHAR (100)
);

CREATE TABLE users IF NOT EXISTS (
  id SERIAL PRIMARY KEY, 
  username VARCHAR(50), 
  firstName VARCHAR(50), 
  lastName VARCHAR(50), 
  password VARCHAR(150)
  );

CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  product_id REFERENCES products(id), 
  quantity integer, 
  user_id REFERENCES users(id), 
  order_status VARCHAR(15)
);