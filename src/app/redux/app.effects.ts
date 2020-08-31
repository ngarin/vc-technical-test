import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import { fetchProducts, fetchProductsSuccess, fetchProductsError } from './app.actions'
import { ProductService } from '../core/backend/product/product.service'

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProducts),
      switchMap(() =>
        this.productService.fetch().pipe(
          map(products => fetchProductsSuccess({ products })),
          catchError(() => of(fetchProductsError()))
        )
      )
    )
  )
}
