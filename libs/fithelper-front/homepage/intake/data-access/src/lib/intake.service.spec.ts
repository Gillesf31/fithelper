import { IntakeService } from './intake.service';
import { UserInformationType } from './models/user-information.type';

describe('IntakeService', () => {
  let service: IntakeService;
  beforeEach(() => {
    service = new IntakeService();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateMaintenance', () => {
    const users: (UserInformationType & { expected: number })[] = [
      {
        gender: 'male',
        age: 25,
        weight: 75,
        height: 180,
        activityFactor: 1.5,
        caloriesAdjustment: '250',
        expected: 2634,
      },
      {
        gender: 'female',
        age: 50,
        weight: 65,
        height: 165,
        activityFactor: 1.2,
        caloriesAdjustment: '500',
        expected: 1528,
      },
      {
        gender: 'male',
        age: 70,
        weight: 70,
        height: 175,
        activityFactor: 1.4,
        caloriesAdjustment: '750',
        expected: 2035,
      },
      {
        gender: 'female',
        age: 30,
        weight: 55,
        height: 160,
        activityFactor: 1.6,
        caloriesAdjustment: '250',
        expected: 1985,
      },
      {
        gender: 'male',
        age: 45,
        weight: 80,
        height: 170,
        activityFactor: 1.3,
        caloriesAdjustment: '500',
        expected: 2139,
      },
    ];
    test.each(users)(
      'should return the calculated maintenance calories for %p',
      (userStats) => {
        expect(service.calculateMaintenance(userStats)).toEqual(
          userStats.expected,
        );
      },
    );
  });

  describe('calculateCaloriesIntake', () => {
    test.each([
      [2000, 80, 250, 2220],
      [1555, 55, 500, 1858],
      [1834, 110, 750, 2742],
      [2000, 80, -250, 1780],
      [1555, 55, -500, 1252],
      [1834, 110, -750, 926],
      [3230, 89, 250, 3475],
      [3230, 89, -250, 2985],
      [3230, 89, 500, 3720],
      [3230, 89, -500, 2740],
      [3230, 89, 750, 3964],
      [3230, 89, -750, 2496],
    ])(
      'given baseCalories=%i, weight=%i, goalCaloriesDifference=%i, should return %i as the calculated intake calories',
      (baseCalories, weight, goalCaloriesDifference, expected) => {
        expect(
          service.calculateCaloriesIntake(
            baseCalories,
            weight,
            goalCaloriesDifference,
          ),
        ).toEqual(expected);
      },
    );
  });
});
