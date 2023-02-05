export type Product = {
  name: string,
  price: number,
  category: string
}

export type Order = {
  productId: number,
  quantity: number,
  userId: number,
  orderStatus: string
}

export type User = {
  username: string,
  firstName?: string,
  lastName?: string,
  password: string
}