import { createSelector } from '@ngrx/store'

import { IAppState } from './app.reducer'

const getPriceWithOffer = (price, offer) => Math.round(price - (price * offer) / 100)

export const selectAppState = (store: { appState: IAppState }) => store.appState

export const selectProductsState = createSelector(selectAppState, ({ products }) => {
  const {
    brand,
    country,
    priceRange: [min, max],
  } = products.filters

  const { offer } = products
  return {
    ...products,
    data: products.data
      .map(prod => ({
        ...prod,
        price: {
          ...prod.price,
          price_in_cents: getPriceWithOffer(prod.price.price_in_cents, offer),
          price: `${getPriceWithOffer(prod.price.price_in_cents, offer) / 100}${prod.price.currency}`,
        },
        formattedPrice: `${getPriceWithOffer(prod.price.price_in_cents, offer) / 100}${prod.price.currency}`,
      }))
      .filter(
        prod =>
          (!brand || brand === prod.brand) &&
          (!country || prod.shippable_countries.includes(country)) &&
          (min === null || (min <= prod.price.price_in_cents && max >= prod.price.price_in_cents))
      ),
  }
})
