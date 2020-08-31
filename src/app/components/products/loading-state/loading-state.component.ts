import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-loading-state',
  templateUrl: './loading-state.component.html',
  styleUrls: ['./loading-state.component.scss'],
})
export class LoadingStateComponent implements OnInit {
  @Input() public isLoading = false

  constructor() {}

  public ngOnInit() {}
}
