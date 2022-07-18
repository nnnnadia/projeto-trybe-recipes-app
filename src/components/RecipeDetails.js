import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IngredientsList from './IngredientsList';
import Recommended from './Recommended';
import { fetchDetailsDrink, fetchDetailsFood } from '../data';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const [details, setDetails] = useState({});

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

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb || details.strDrinkThumb }
        alt="Imagem da receita"
      />
      <h3 data-testid="recipe-title">{details.strMeal || details.strDrink}</h3>
      <h5 data-testid="recipe-category">
        {isFood ? details.strCategory : details.strAlcoholic}
      </h5>
      <IngredientsList details={ details } />
      <h4>Instructions</h4>
      <p data-testid="instructions">{details.strInstructions}</p>
      {isFood && (
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
      <Recommended />
      <button className="fixarButton" type="button" data-testid="start-recipe-btn">
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
