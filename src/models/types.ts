export type Product = {
  name: string,
  price: number,
  category: string
}

export type Order = {
  id: number,
  userId: number,
  orderStatus: string
}

export type OrderProduct = {
  id: number,
  quantity: number,
  orderId: number,
  productId: number
}

export type User = {
  username: string,
  firstName?: string,
  lastName?: string,
  password: string
}