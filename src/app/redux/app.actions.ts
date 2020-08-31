import { createAction, props } from '@ngrx/store'

import { IProduct } from '../types/product.interface'

export const fetchProducts = createAction('[Products] Fetching products...')
export const fetchProductsSuccess = createAction('[Products] Fetch products done', props<{ products: IProduct[] }>())
export const fetchProductsError = createAction('[Products] Fetch products error')

export const filterProducts = createAction(
  '[Products] Filter products',
  props<{
    brand?: string
    country?: string
    priceRange?: [number, number]
  }>()
)

export const setOffer = createAction('[Products] Set offer', props<{ offer: number }>())
