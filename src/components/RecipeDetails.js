import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDetailsDrink, fetchDetailsFood } from '../data';

function RecipeDetails() {
  const [details, setDetails] = useState({});

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const isFood = history.location.pathname.includes('/food');

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

  return <div>RecipeDetails</div>;
}

export default RecipeDetails;
