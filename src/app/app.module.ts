import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { reducer } from './redux/app.reducer'
import { environment } from '../environments/environment'
import { AppEffects } from './redux/app.effects'
import { LoadingStateComponent } from './components/products/loading-state/loading-state.component'
import { ErrorStateComponent } from './components/products/error-state/error-state.component'
import { ProductsComponent } from './components/products/products.component';
import { OrderByPipe } from './shared/order-by/order-by.pipe';
import { DateSincePipe } from './shared/date-since/date-since.pipe'

@NgModule({
  declarations: [AppComponent, LoadingStateComponent, ErrorStateComponent, ProductsComponent, OrderByPipe, DateSincePipe],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ appState: reducer }, {}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
