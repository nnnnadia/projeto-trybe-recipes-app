import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { recipesData } = useContext(RecipesContext);

  const history = useHistory();

  const isFood = history.location.pathname === '/food';

  const MAX_ITEMS = 12;

  return (
    <div>
      <Header pageTitle="Drinks" showSearchIcon />
      {!isFood
        && recipesData
        && recipesData.length > 1
        && recipesData.slice(0, MAX_ITEMS).map((recipe, index) => (
          <div key={ recipe.idDrink }>
            <CardRecipe
              image={ recipe.strDrinkThumb }
              title={ recipe.strDrink }
              index={ index }
            />
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
