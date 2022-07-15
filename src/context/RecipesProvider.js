import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchDrinks, fetchFoods } from '../data';

function RecipesProvider({ children }) {
  const [search, setSearch] = useState({
    text: '',
    option: 'ingredients',
  });
  const [recipesData, setRecipesData] = useState([]);

  const data = async (pathName, option, text) => {
    const isFood = pathName === '/foods';
    if (isFood) {
      const dataFood = await fetchFoods(option, text);
      setRecipesData(dataFood.meals);
    } else {
      const dataDrink = await fetchDrinks(option, text);
      setRecipesData(dataDrink.drinks);
    }
  };

  const contextValue = {
    search,
    setSearch,
    recipesData,
    data,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
};

export default RecipesProvider;
