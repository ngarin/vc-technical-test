export interface IProduct {
  id: number
  name: string
  brand: string
  seller: {
    name: string
    id: number
    country: string
  }
  price: {
    currency: string
    price_in_cents: number
    price: string
  }
  deposited_on: Date
  shippable_countries: string[]
}
