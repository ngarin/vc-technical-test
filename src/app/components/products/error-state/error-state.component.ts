import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss'],
})
export class ErrorStateComponent implements OnInit {
  @Input() public hasError = false

  constructor() {}

  public ngOnInit() {}
}
