# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index => GET '/products' 
- Show => GET '/products/:productId'
- Create [token required] => POST '/products'
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] => GET '/users'
- Show [token required] => GET '/users/:userId'
- Create N[token required] => POST '/users'

#### Orders
- Current Order by user (args: user id)[token required] => GET /orders/:userId/
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes 
#### Product => 
##### Table: products (id:SERIAL PRIMARY KEY, name:VARCHAR, price:NUMERIC, category:VARCHAR)
-  id
- name
- price
- [OPTIONAL] category

#### User => 
##### Table: users (id:SERIAL PRIMARY KEY, first_name: VARCHAR, last_name: VARCHAR, username: VARCHAR, password:VARCHAR);
- id
- firstName
- lastName
- password

#### Orders => 
##### Table: orders (id:SERIAL PRIMARY KEY, order_status:VARCHAR, user_id:bigint [foreign key to users table])
##### Table: order_products(id: SERIAL PRIMARY KEY, quantity:integer, order_id:bigint [foreign key to orders table], product_id:bigint [foreign key to products table])

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

