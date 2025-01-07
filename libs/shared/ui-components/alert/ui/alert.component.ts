import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fithelper-front-shared-alert-ui',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input({ required: false }) public alertType:
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | undefined = undefined;
  @Input({ required: true }) public description: string | undefined;
}
