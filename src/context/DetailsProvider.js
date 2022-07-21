import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import DetailsContext from './DetailsContext';
import RecipesContext from './RecipesContext';
import {
  fetchDetailsDrink,
  fetchDetailsFood,
  readStorageDoneRecipes,
  readStorageFavoriteRecipes,
  readStorageInProgressRecipes,
  saveStorageDoneRecipes,
  saveStorageFavoriteRecipes,
  saveStorageInProgressRecipes,
} from '../services';

function DetailsProvider({ children }) {
  const [details, setDetails] = useState({});
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [indexIngredients, setIndexIngredients] = useState([]);
  const [finishButtonDisabled, setFinishButtonDisabled] = useState(true);

  const { isFood, handlePageOn } = useContext(RecipesContext);

  const { id } = useParams();

  useEffect(() => {
    const doneRecipes = readStorageDoneRecipes();
    const finished = doneRecipes.some((recipe) => recipe.id === id);

    if (finished) {
      setDone(true);
    }
  }, []);

  useEffect(() => {
    const favorites = readStorageFavoriteRecipes();

    const checkFavorite = favorites.some((favorite) => favorite.id === id);
    if (checkFavorite) {
      setIsFavorite(true);
    }
  }, []);

  useEffect(() => {
    const inProgressLocalStorage = readStorageInProgressRecipes();

    if (isFood && inProgressLocalStorage.meals[id]) {
      setIndexIngredients(inProgressLocalStorage.meals[id]);
    }

    if (!isFood && inProgressLocalStorage.cocktails[id]) {
      setIndexIngredients(inProgressLocalStorage.cocktails[id]);
    }
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      if (isFood) {
        const foodDetails = await fetchDetailsFood(id);
        if (foodDetails.meals) setDetails(foodDetails.meals[0]);
      } else {
        const drinkDetails = await fetchDetailsDrink(id);
        setDetails(drinkDetails.drinks[0]);
      }
    };

    getDetails();
  }, [isFood, id]);

  useEffect(() => {
    const favorites = readStorageFavoriteRecipes();

    const checkFavorite = favorites.some((favorite) => favorite.id === id);
    if (checkFavorite) {
      setIsFavorite(true);
    }

    const progress = readStorageInProgressRecipes();

    if (isFood) {
      const progressMealsIds = Object.keys(progress.meals);
      const checkProgressFood = progressMealsIds.some(
        (idMeal) => idMeal === id,
      );
      if (checkProgressFood) {
        setInProgress(true);
      }
    } else {
      const progressCocktailsIds = Object.keys(progress.cocktails);
      const checkProgressDrink = progressCocktailsIds.some(
        (idDrink) => idDrink === id,
      );
      if (checkProgressDrink) {
        setInProgress(true);
      }
    }
  }, [id, isFood]);

  useEffect(() => {
    if (isFood) {
      saveStorageInProgressRecipes('meals', id, indexIngredients);
    } else {
      saveStorageInProgressRecipes('cocktails', id, indexIngredients);
    }

    const ingredientsList = { ...details };

    Object.keys(ingredientsList).forEach((key) => {
      if (!key.includes('strIngredient')) {
        delete ingredientsList[key];
      }
    });

    const ingredientsFiltered = Object.values(ingredientsList).filter(
      (ingredient) => ingredient && ingredient.length > 0,
    );

    if (
      ingredientsFiltered.length > 0
      && ingredientsFiltered.length === indexIngredients.length
    ) {
      setFinishButtonDisabled(false);
    } else {
      setFinishButtonDisabled(true);
    }
  }, [indexIngredients]);

  const handlePush = () => {
    if (isFood) {
      handlePageOn(`/foods/${id}/in-progress`);
    } else {
      handlePageOn(`/drinks/${id}/in-progress`);
    }
  };

  const setFavoritesRecipes = () => {
    const favorites = readStorageFavoriteRecipes();

    const checkFavorite = favorites.some((favorite) => favorite.id === id);
    if (!checkFavorite) {
      setIsFavorite(true);
      const favoriteObj = {
        id: details.idMeal || details.idDrink,
        type: isFood ? 'food' : 'drink',
        nationality: details.strArea || '',
        category: details.strCategory || '',
        alcoholicOrNot: details.strAlcoholic || '',
        name: details.strMeal || details.strDrink,
        image: details.strMealThumb || details.strDrinkThumb,
      };
      saveStorageFavoriteRecipes(favoriteObj);
    } else {
      setIsFavorite(false);
      const removeFavorite = favorites.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    }
  };

  const handleClickFinish = () => {
    const recipeObj = {
      id: details.idMeal || details.idDrink,
      type: isFood ? 'food' : 'drink',
      nationality: details.strArea || '',
      category: details.strCategory || '',
      alcoholicOrNot: details.strAlcoholic || '',
      name: details.strMeal || details.strDrink,
      image: details.strMealThumb || details.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags:
        details.strTags && details.strTags.length > 0
          ? details.strTags.split(',')
          : [],
    };
    saveStorageDoneRecipes(recipeObj);

    handlePageOn('/done-recipes');
  };

  const contextValue = {
    details,
    done,
    inProgress,
    isFavorite,
    indexIngredients,
    setIndexIngredients,
    finishButtonDisabled,
    handlePush,
    setFavoritesRecipes,
    handleClickFinish,
  };

  return (
    <DetailsContext.Provider value={ contextValue }>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
};

export default DetailsProvider;
