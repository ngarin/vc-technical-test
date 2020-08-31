import { Action, createReducer, on } from '@ngrx/store'

import { IProduct } from '../types/product.interface'
import { fetchProducts, fetchProductsSuccess, fetchProductsError, filterProducts, setOffer } from './app.actions'

export interface IAppState {
  products: {
    behaviour: {
      isLoading: boolean
      hasError: boolean
    }
    data: IProduct[]
    offer: number
    filters: {
      brand: string
      country: string
      priceRange: [number, number]
    }
  }
}

const initialState: IAppState = {
  products: {
    behaviour: {
      isLoading: false,
      hasError: false,
    },
    data: [],
    offer: null,
    filters: {
      brand: '',
      country: '',
      priceRange: [null, null],
    },
  },
}

const appReducer = createReducer(
  initialState,
  on(fetchProducts, state => ({
    ...state,
    products: {
      ...state.products,
      behaviour: {
        isLoading: true,
        hasError: false,
      },
    },
  })),
  on(fetchProductsSuccess, (state, { products }) => ({
    ...state,
    products: {
      ...state.products,
      behaviour: {
        isLoading: false,
        hasError: false,
      },
      data: products,
    },
  })),
  on(fetchProductsError, state => ({
    ...state,
    products: {
      ...state.products,
      behaviour: {
        isLoading: false,
        hasError: true,
      },
    },
  })),
  on(filterProducts, (state, filters) => ({
    ...state,
    products: {
      ...state.products,
      filters: {
        ...state.products.filters,
        ...filters,
      },
    },
  })),
  on(setOffer, (state, { offer }) => ({
    ...state,
    products: {
      ...state.products,
      offer,
    },
  }))
)

export function reducer(state: IAppState | undefined, action: Action) {
  return appReducer(state, action)
}
