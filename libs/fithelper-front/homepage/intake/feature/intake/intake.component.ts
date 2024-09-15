import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IntakeService,
  UserInformationType,
} from '@fithelper/fithelper-front/homepage/intake/data-access';
import { ActivityFactorComponent } from '../activityFactor/activity-factor.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ActivityFactorComponent],
  templateUrl: './intake.component.html',
  selector: 'fithelper-intake',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakeComponent {
  public userCaloriesIntake: UserInformationType = {
    gender: 'male',
    activityFactor: 1.4,
    caloriesAdjustment: '250',
    measurementSystem: 'metric',
  };
  public bmr: WritableSignal<number> = signal(0);
  public weight: WritableSignal<number> = signal(0);
  public caloriesAdjustment: WritableSignal<number> = signal(0);
  readonly #intakeService = inject(IntakeService);
  public muscleGains = computed(() => {
    return this.#intakeService.calculateCaloriesIntake(
      this.bmr(),
      this.weight(),
      this.caloriesAdjustment(),
    );
  });
  public loseFat = computed(() => {
    return this.#intakeService.calculateCaloriesIntake(
      this.bmr(),
      this.weight(),
      -this.caloriesAdjustment(),
    );
  });

  public calculateMaintenance(userStats: UserInformationType): void {
    if (!userStats.age || !userStats.weight || !userStats.height) return;
    this.caloriesAdjustment.set(parseInt(userStats.caloriesAdjustment));
    this.weight.set(userStats.weight);
    this.bmr.set(this.#intakeService.calculateMaintenance(userStats));
  }

  public updateSystem(): void {
    this.userCaloriesIntake.measurementSystem =
      this.userCaloriesIntake.measurementSystem === 'metric'
        ? 'imperial'
        : 'metric';
  }
}
