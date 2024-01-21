import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fithelper-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<span
    class="loading loading-spinner"
    [class]="size"
    [ngClass]="color ?? ''"
  ></span>`,
})
export class LoaderComponent {
  @Input() public size:
    | 'loading-xs'
    | 'loading-sm'
    | 'loading-md'
    | 'loading-lg' = 'loading-lg';

  @Input() public color:
    | 'text-primary'
    | 'text-secondary'
    | 'text-accent'
    | 'text-neutral'
    | 'text-info'
    | 'text-success'
    | 'text-warning'
    | 'text-error'
    | undefined = undefined;
}
