import {
  fetchDrinks,
  fetchCategoriesDrinks,
  fetchDrinksByCategory,
  fetchDetailsDrink,
} from './fetchDrinks';
import {
  fetchFoods,
  fetchCategoriesFoods,
  fetchFoodsByCategory,
  fetchDetailsFood,
} from './fetchFoods';
import {
  readStorageDoneRecipes,
  saveStorageDoneRecipes,
  readStorageInProgressRecipes,
  saveStorageInProgressRecipes,
  readStorageFavoriteRecipes,
  saveStorageFavoriteRecipes,
} from './recipesLocalStorage';
import {
  readStorageUserData,
  saveStorageUserData,
  clearLocalStorage,
} from './userLocalStorage';

export {
  fetchDrinks,
  fetchCategoriesDrinks,
  fetchFoods,
  fetchCategoriesFoods,
  fetchFoodsByCategory,
  fetchDrinksByCategory,
  fetchDetailsFood,
  fetchDetailsDrink,
  readStorageDoneRecipes,
  saveStorageDoneRecipes,
  readStorageInProgressRecipes,
  saveStorageInProgressRecipes,
  readStorageFavoriteRecipes,
  saveStorageFavoriteRecipes,
  readStorageUserData,
  saveStorageUserData,
  clearLocalStorage,
};
