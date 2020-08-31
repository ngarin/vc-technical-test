import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() public isLoading = false
  @Input() public hasError = false
  @Input() public products = []
  @Input() public sort = { param: '', desc: false }

  constructor() {}

  public ngOnInit() {}
}
