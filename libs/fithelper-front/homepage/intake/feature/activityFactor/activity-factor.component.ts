import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'fithelper-activity-factor',
  imports: [CommonModule, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <table class="table">
    <tbody>
      <tr>
        <td>
          <p>
            <b
              ><span>{{
                'activityFactor.levelOfActivity' | transloco
              }}</span></b
            >
          </p>
        </td>
        <td>
          <p>
            <b
              ><span>{{ 'activityFactor.activityFactor' | transloco }}</span></b
            >
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <span>{{ 'activityFactor.bedRest' | transloco }}</span>
          </p>
        </td>
        <td>
          <p><span>1.0-1.1</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <span>{{ 'activityFactor.sedentary' | transloco }}</span>
          </p>
        </td>
        <td>
          <p><span>1.2</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <span>{{ 'activityFactor.light' | transloco }}</span>
          </p>
        </td>
        <td>
          <p><span>1.3</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <span>{{ 'activityFactor.moderate' | transloco }}</span>
          </p>
        </td>
        <td>
          <p><span>1.5</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <span>{{ 'activityFactor.heavy' | transloco }}</span>
          </p>
        </td>
        <td>
          <p><span>1.7</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <span>{{ 'activityFactor.veryHeavy' | transloco }}</span>
          </p>
        </td>
        <td>
          <p><span>1.9</span></p>
        </td>
      </tr>
    </tbody>
  </table>`,
})
export class ActivityFactorComponent {}
