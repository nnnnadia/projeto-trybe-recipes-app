import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import IngredientsList from './IngredientsList';
import Recommended from './Recommended';
import { fetchDetailsDrink, fetchDetailsFood } from '../data';
import {
  readStorageDoneRecipes,
  readStorageFavoriteRecipes,
  readStorageInProgressRecipes,
  saveStorageFavoriteRecipes,
} from '../services/recipesLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetails.css';

function RecipeInProgress() {
  const [details, setDetails] = useState({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  console.log(details);

  const history = useHistory();
  const isFood = history.location.pathname.includes('/food');

  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      if (isFood) {
        const foodDetails = await fetchDetailsFood(id);
        setDetails(foodDetails.meals[0]);
      } else {
        const drinkDetails = await fetchDetailsDrink(id);
        setDetails(drinkDetails.drinks[0]);
      }
    };

    getDetails();
  }, []);

  const editUrlVideo = () => {
    if (details.strYoutube) {
      const initialUrl = details.strYoutube;
      const edited = initialUrl.replace('watch?v=', 'embed/');

      return edited;
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

  const handlePush = () => {
    if (isFood) {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const clickShare = () => {
    if (isFood) {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
    setCopied(true);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb || details.strDrinkThumb }
        alt="Imagem da receita"
      />
      <h3 data-testid="recipe-title">{details.strMeal || details.strDrink}</h3>
      <button type="button" data-testid="share-btn" onClick={ clickShare }>
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button type="button" onClick={ setFavoritesRecipes }>
        {isFavorite ? (
          <img
            src={ blackHeartIcon }
            alt="favoritar"
            data-testid="favorite-btn"
          />
        ) : (
          <img
            src={ whiteHeartIcon }
            alt="favoritar"
            data-testid="favorite-btn"
          />
        )}
      </button>
      {copied && <span>Link copied!</span>}
      <h5 data-testid="recipe-category">
        {isFood ? details.strCategory : details.strAlcoholic}
      </h5>
      <IngredientsList details={ details } inProgress />
      <h4>Instructions</h4>
      <p data-testid="instructions">{details.strInstructions}</p>
      {/* {isFood && (
        <>
          <h4>Video</h4>
          <iframe
            data-testid="video"
            width="420"
            height="315"
            src={ editUrlVideo() }
            title="Video no Youtube"
          />
        </>
      )}
      <Recommended /> */}
      <button
        // className="fixarButton"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handlePush }
      >
        Finish
      </button>
    </div>
  );
}

export default RecipeInProgress;
