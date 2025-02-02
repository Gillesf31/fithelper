import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fithelper-front-shared-alert-ui',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  public alertType = input<
    'success' | 'info' | 'warning' | 'error' | undefined
  >(undefined);

  public description = input.required<string>();

  public dataTestId = input<string>();
}
