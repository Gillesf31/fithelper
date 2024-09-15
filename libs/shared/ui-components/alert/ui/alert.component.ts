import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fithelper-front-shared-alert-ui',
  standalone: true,
  imports: [CommonModule],
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
