import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fithelper-activity-factor',
  standalone: true,
  imports: [CommonModule],
  template: ` <table class="table">
    <tbody>
      <tr>
        <td>
          <p>
            <b><span>Level of Activity</span></b>
          </p>
        </td>
        <td>
          <p>
            <b><span>Activity factor</span></b>
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p><span>Bed rest (Bed ridden - Unconscious)</span></p>
        </td>
        <td>
          <p><span>1.0-1.1</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p><span>Sedentary (Little to no exercise)</span></p>
        </td>
        <td>
          <p><span>1.2</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p><span>Light exercise (1-3 days per week)</span></p>
        </td>
        <td>
          <p><span>1.3</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p><span>Moderate exercise (3-5 days per week)</span></p>
        </td>
        <td>
          <p><span>1.5</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p><span>Heavy exercise (6-7 days per week)</span></p>
        </td>
        <td>
          <p><span>1.7</span></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <span
              >Very heavy exercise (twice per day, extra heavy workouts)</span
            >
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
