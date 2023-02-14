CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id bigint REFERENCES users(id), 
  order_status VARCHAR(15)
);