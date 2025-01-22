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
  protected userInformation: WritableSignal<UserInformationType> = signal({
    age: undefined,
    weight: undefined,
    gender: 'male',
    activityFactor: 1.4,
    caloriesAdjustment: 250,
    measurementSystem: 'metric',
  });

  readonly #intakeService = inject(IntakeService);

  protected bmr = computed(() => {
    return this.#intakeService.calculateMaintenance(this.userInformation());
  });

  protected muscleGains = computed(() => {
    if (!this.userInformation().weight) return 0;
    if (!this.userInformation().caloriesAdjustment) return 0;

    return this.#intakeService.calculateCaloriesIntake(
      this.bmr(),
      this.userInformation().weight!,
      this.userInformation().caloriesAdjustment!,
    );
  });
  protected loseFat = computed(() => {
    if (!this.userInformation().weight) return 0;
    if (!this.userInformation().caloriesAdjustment) return 0;

    return this.#intakeService.calculateCaloriesIntake(
      this.bmr(),
      this.userInformation().weight!,
      -this.userInformation().caloriesAdjustment!,
    );
  });

  protected updateSystem(): void {
    this.userInformation.set({
      ...this.userInformation(),
      measurementSystem:
        this.userInformation().measurementSystem === 'metric'
          ? 'imperial'
          : 'metric',
    });
  }

  protected updateGender(event: Event): void {
    const gender = (event.target as HTMLInputElement)
      .value as UserInformationType['gender'];
    this.userInformation.set({
      ...this.userInformation(),
      gender,
    });
  }

  protected updateActivityFactor(event: Event): void {
    const activityFactor = (event.target as HTMLInputElement)
      .value as unknown as UserInformationType['activityFactor'];
    this.userInformation.set({
      ...this.userInformation(),
      activityFactor,
    });
  }

  protected updateCaloriesAdjustment(event: Event): void {
    const caloriesAdjustment = (event.target as HTMLInputElement)
      .value as unknown as UserInformationType['caloriesAdjustment'];
    this.userInformation.set({
      ...this.userInformation(),
      caloriesAdjustment:
        (Number(caloriesAdjustment) as 250 | 500 | 750) || undefined,
    });
  }

  protected updateAge(event: Event): void {
    const age = (event.target as HTMLInputElement).value;
    this.userInformation.set({
      ...this.userInformation(),
      age: parseInt(age),
    });
  }

  protected updateWeight(event: Event): void {
    const weight = (event.target as HTMLInputElement).value;
    this.userInformation.set({
      ...this.userInformation(),
      weight: parseInt(weight),
    });
  }

  protected updateHeight(event: Event): void {
    const height = (event.target as HTMLInputElement).value;
    this.userInformation.set({
      ...this.userInformation(),
      height: parseInt(height),
    });
  }
}
