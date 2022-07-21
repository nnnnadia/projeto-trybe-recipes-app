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
  saveStorageFavoriteRecipes,
} from '../services';

function DetailsProvider({ children }) {
  const [details, setDetails] = useState({});
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { isFood, handlePageOn } = useContext(RecipesContext);

  const { id } = useParams();

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

  const contextValue = {
    details,
    done,
    inProgress,
    isFavorite,
    handlePush,
    setFavoritesRecipes,
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
