import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IngredientsList from './IngredientsList';
import { fetchDetailsDrink, fetchDetailsFood } from '../data';

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
      <h4 data-testid="recipe-category">
        {isFood ? details.strCategory : details.strAlcoholic}
      </h4>
      <IngredientsList details={ details } />
      <p data-testid="instructions">{details.strInstructions}</p>
      {isFood && (
        <iframe
          data-testid="video"
          width="420"
          height="315"
          src={ editUrlVideo() }
          title="Video no Youtube"
        />
      )}
      <p data-testid="0-recomendation-card">Recomendadas</p>
    </div>
  );
}

export default RecipeDetails;
