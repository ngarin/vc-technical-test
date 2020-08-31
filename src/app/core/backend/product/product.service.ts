import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IProduct } from 'src/app/types/product.interface'

const forbiddenBrand = ['Louis Vuitton']

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public fetch(): Observable<IProduct[]> {
    return this.httpClient.get<{ products: IProduct[] }>('/assets/products.json').pipe(
      map(({ products }) =>
        products.map(prod => {
          return {
            ...prod,
            brand: this.obfuscateBrand(prod.brand),
          }
        })
      )
    )
  }

  private obfuscateBrand(brand) {
    if (!forbiddenBrand.includes(brand)) {
      return brand
    }

    return brand
      .split('')
      .reverse()
      .join('')
  }
}
