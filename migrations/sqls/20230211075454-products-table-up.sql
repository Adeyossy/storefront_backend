CREATE TABLE products (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100), 
  price NUMERIC(5, 2), 
  category VARCHAR (100)
);