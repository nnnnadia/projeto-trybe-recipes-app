import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
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
import '../styles/RecipeDetails.css';
import { FixedFooter } from '../styles/StyledComponents';
import RecipeDetailsTitle from './RecipeDetailsTitle';

function RecipeDetails() {
  const [details, setDetails] = useState({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const editUrlVideo = () => {
    if (details.strYoutube) {
      const initialUrl = details.strYoutube;
      const edited = initialUrl.replace('watch?v=', 'embed/');

      return edited;
    }
  };

  const handlePush = () => {
    if (isFood) {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
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

  const clickShare = () => {
    if (isFood) {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
    setCopied(true);
  };

  return (
    <>
      <Card sx={ { maxWidth: 345 } }>
        <CardMedia
          component="img"
          height="240"
          image={ details.strMealThumb || details.strDrinkThumb }
          alt="Imagem da receita"
        />
        <RecipeDetailsTitle
          details={ details }
          clickShare={ clickShare }
          setFavoritesRecipes={ setFavoritesRecipes }
          isFavorite={ isFavorite }
          copied={ copied }
        />
        <CardContent>
          <Chip
            label={ isFood ? details.strCategory : details.strAlcoholic }
            data-testid="recipe-category"
          />
          <IngredientsList details={ details } inProgress={ false } />
          <Typography variant="h5" gutterBottom>
            Instructions
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            data-testid="instructions"
          >
            {details.strInstructions}
          </Typography>
          {isFood && (
            <>
              <Typography variant="h5" gutterBottom>
                Video
              </Typography>
              <CardMedia
                component="iframe"
                data-testid="video"
                src={ editUrlVideo() }
              />
            </>
          )}
          <Recommended />
        </CardContent>
      </Card>
      {!done && (
        <FixedFooter>
          <Button
            variant="contained"
            color="success"
            fullWidth
            data-testid="start-recipe-btn"
            onClick={ handlePush }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </Button>
        </FixedFooter>
      )}
    </>
  );
}

export default RecipeDetails;
