export function getMacronutrients(
  weight: number,
  caloriesIntake: number,
  fatRatio = 1,
  proteinRatio = 2,
) {
  if (caloriesIntake === 0)
    return {
      fats: 0,
      proteins: 0,
      carbs: 0,
    };

  const fats = getFatsOrProteinByWeight(weight, fatRatio);
  const fatsCalories = getCaloriesForFats(fats);
  const proteins = getFatsOrProteinByWeight(weight, proteinRatio);
  const proteinsCalories = getCaloriesForProtein(proteins);

  const restCalories = caloriesIntake - fatsCalories - proteinsCalories;

  const CALORIES_PER_GRAM = 4;

  const carbs = restCalories / CALORIES_PER_GRAM;

  return {
    fats,
    proteins,
    carbs,
  };
}

export function getFatsOrProteinByWeight(weight: number, ratio = 1): number {
  if (weight === 0) return weight;

  return weight * ratio;
}

export function getCaloriesForFats(fats: number): number {
  const CALORIES_PER_GRAM = 9;
  return fats * CALORIES_PER_GRAM;
}

export function getCaloriesForProtein(protein: number): number {
  const CALORIES_PER_GRAM = 4;
  return protein * CALORIES_PER_GRAM;
}
