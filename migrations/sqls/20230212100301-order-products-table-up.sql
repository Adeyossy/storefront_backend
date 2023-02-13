CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id bigint REFERENCES order(id),
  product_id bigint REFERENCES product(id)
);