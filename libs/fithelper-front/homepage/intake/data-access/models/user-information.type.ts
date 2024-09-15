export type UserInformationType = {
  gender: 'female' | 'male';
  age?: number | undefined;
  weight?: number | undefined;
  height?: number | undefined;
  activityFactor: 1.0 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9;
  caloriesAdjustment: string;
  measurementSystem: 'metric' | 'imperial';
};