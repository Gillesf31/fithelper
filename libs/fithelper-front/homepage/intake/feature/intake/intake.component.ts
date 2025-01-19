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
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  imports: [CommonModule, FormsModule, ActivityFactorComponent, TranslocoPipe],
  templateUrl: './intake.component.html',
  selector: 'fithelper-intake',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakeComponent {
  protected defaultUserInformation: WritableSignal<UserInformationType> =
    signal({
      gender: 'male',
      activityFactor: 1.4,
      caloriesAdjustment: '250',
      measurementSystem: 'metric',
    });
  protected bmr: WritableSignal<number> = signal(0);
  protected weight: WritableSignal<number> = signal(0);
  protected caloriesAdjustment: WritableSignal<number> = signal(0);
  readonly #intakeService = inject(IntakeService);
  protected muscleGains = computed(() => {
    return this.#intakeService.calculateCaloriesIntake(
      this.bmr(),
      this.weight(),
      this.caloriesAdjustment(),
    );
  });
  protected loseFat = computed(() => {
    return this.#intakeService.calculateCaloriesIntake(
      this.bmr(),
      this.weight(),
      -this.caloriesAdjustment(),
    );
  });

  protected calculateMaintenance(userStats: UserInformationType): void {
    if (!userStats.age || !userStats.weight || !userStats.height) return;
    this.caloriesAdjustment.set(parseInt(userStats.caloriesAdjustment));
    this.weight.set(userStats.weight);
    this.bmr.set(this.#intakeService.calculateMaintenance(userStats));
  }

  protected updateSystem(): void {
    this.defaultUserInformation.set({
      ...this.defaultUserInformation(),
      measurementSystem:
        this.defaultUserInformation().measurementSystem === 'metric'
          ? 'imperial'
          : 'metric',
    });
  }

  protected updateActivityFactor(event: Event): void {
    const activityFactor = (event.target as HTMLInputElement)
      .value as unknown as UserInformationType['activityFactor'];
    this.defaultUserInformation.set({
      ...this.defaultUserInformation(),
      activityFactor,
    });
  }
}
