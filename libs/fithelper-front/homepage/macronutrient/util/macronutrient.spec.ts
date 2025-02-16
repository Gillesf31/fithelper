import {
  getCaloriesForFats,
  getCaloriesForProtein,
  getFatsOrProteinByWeight,
  getMacronutrients,
} from './macronutrient';

describe('Macronutrient', () => {
  test('Get macronutrients', () => {
    expect(getMacronutrients(80, 0)).toEqual({
      fats: 0,
      proteins: 0,
      carbs: 0,
    });
    expect(getMacronutrients(87, 3052, 1, 2)).toEqual({
      fats: 87,
      proteins: 174,
      carbs: 393.25,
    });
    expect(getMacronutrients(80, 3000, 1, 2)).toEqual({
      fats: 80,
      proteins: 160,
      carbs: 410,
    });
    expect(getMacronutrients(80, 3000, 1, 1)).toEqual({
      fats: 80,
      proteins: 80,
      carbs: 490,
    });
    expect(getMacronutrients(80, 2000, 1, 2)).toEqual({
      fats: 80,
      proteins: 160,
      carbs: 160,
    });
  });
  test('getFatsOrProteinByWeight', () => {
    expect(getFatsOrProteinByWeight(80)).toEqual(80);
    expect(getFatsOrProteinByWeight(80, 2)).toEqual(160);
    expect(getFatsOrProteinByWeight(0)).toEqual(0);
  });
  test('getCaloriesForFats', () => {
    expect(getCaloriesForFats(100)).toEqual(900);
    expect(getCaloriesForFats(80)).toEqual(720);
  });
  test('getCaloriesForProtein', () => {
    expect(getCaloriesForProtein(100)).toEqual(400);
    expect(getCaloriesForProtein(80)).toEqual(320);
  });
});
