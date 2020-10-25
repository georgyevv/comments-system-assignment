import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'csm-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
}
