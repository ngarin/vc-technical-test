import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { map } from 'rxjs/operators'

import { IAppState } from './redux/app.reducer'
import { fetchProducts, filterProducts, setOffer } from './redux/app.actions'
import { selectProductsState } from './redux/app.selectors'
import { Observable } from 'rxjs'
import { IProduct } from './types/product.interface'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public filters: {
    brand: string
    country: string
    priceRange: [number, number]
  } = {
    brand: '',
    country: '',
    priceRange: [null, null],
  }

  public sort = { param: '', desc: false }

  public isLoading$: Observable<boolean> = this.store$.pipe(
    select(selectProductsState),
    map(productsState => productsState.behaviour.isLoading)
  )
  public hasError$: Observable<boolean> = this.store$.pipe(
    select(selectProductsState),
    map(productsState => productsState.behaviour.hasError)
  )
  public products$: Observable<IProduct[]> = this.store$.pipe(
    select(selectProductsState),
    map(productsState => productsState.data)
  )

  constructor(
    private store$: Store<{ appState: IAppState }>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.store$.dispatch(fetchProducts())

    this.activatedRoute.queryParams
      .pipe(
        map(({ param }) => {
          if (param === 'Off-White') {
            this.filters.brand = param
            this.store$.dispatch(filterProducts({ ...this.filters }))
            this.store$.dispatch(setOffer({ offer: 10 }))
          } else {
            this.filters.brand = ''
            this.store$.dispatch(filterProducts({ ...this.filters }))
            this.store$.dispatch(setOffer({ offer: null }))
          }
        })
      )
      .subscribe()
  }

  public navigate(param) {
    this.router.navigate(['/'], { queryParams: { param } })
  }

  public toggleCountryFilter(counrty: string) {
    this.filters.country = this.filters.country ? '' : counrty
    this.store$.dispatch(filterProducts({ ...this.filters }))
  }

  public togglePriceRangeFilter(min: number, max: number) {
    this.filters.priceRange = this.filters.priceRange[0] !== null ? [null, null] : [min, max]
    this.store$.dispatch(filterProducts({ ...this.filters }))
  }

  public priceSort() {
    if (!this.sort.param || this.sort.desc) {
      this.sort = { param: 'formattedPrice', desc: false }
    } else if (this.sort.param && !this.sort.desc) {
      this.sort = { param: 'formattedPrice', desc: true }
    }
  }
}
