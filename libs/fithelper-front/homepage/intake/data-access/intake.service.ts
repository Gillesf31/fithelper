import { Injectable } from '@angular/core';
import { UserInformationType } from './models/user-information.type';

@Injectable()
export class IntakeService {
  public calculateMaintenance(userStats: UserInformationType): number {
    return Math.round(this.#calculateBMR(userStats) * userStats.activityFactor);
  }

  public calculateCaloriesIntake(
    bmr: number,
    weight: number,
    calorieAdjustmentDelta: number,
  ): number {
    const kgToLbs = 2.2;
    const calorieAdjustment = Math.round(
      weight * kgToLbs * 0.005 * calorieAdjustmentDelta,
    );
    return bmr + calorieAdjustment;
  }

  #calculateBMR(userStats: UserInformationType): number {
    const { gender, age, weight, height } = userStats;
    if (!age || !weight || !height) return 0;

    if (gender === 'male') {
      return 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    } else {
      return 9.99 * weight + 6.25 * height - 4.92 * age - 161;
    }
  }
}
