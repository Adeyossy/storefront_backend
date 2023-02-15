export type Product = {
  id?: number,
  name: string,
  price: number,
  category: string
}

export type Order = {
  id?: number,
  user_id: number,
  order_status: string
}

export type OrderProduct = {
  id: number,
  quantity: number,
  order_id: number,
  product_id: number
}

export type User = {
  id?: number,
  username: string,
  first_name?: string,
  last_name?: string,
  password: string
}