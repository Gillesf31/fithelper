import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fithelper-loader',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span
    class="loading loading-spinner"
    [class]="size()"
    [ngClass]="color() ?? ''"
  ></span>`,
})
export class LoaderComponent {
  public size = input<
    'loading-xs' | 'loading-sm' | 'loading-md' | 'loading-lg'
  >('loading-lg');

  public color = input<
    | 'text-primary'
    | 'text-secondary'
    | 'text-accent'
    | 'text-neutral'
    | 'text-info'
    | 'text-success'
    | 'text-warning'
    | 'text-error'
    | undefined
  >(undefined);
}
