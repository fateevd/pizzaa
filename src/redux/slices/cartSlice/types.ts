export type CartItems = {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  type: string,
  size: number,
  count: number,
}

export interface CartSliceState {
  items: CartItems[],
  totalPrice: number,
}