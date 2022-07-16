import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { fetchDrinks, fetchFoods } from '../data';

function RecipesProvider({ children }) {
  const [search, setSearch] = useState({
    text: '',
    option: 'ingredients',
  });
  const [recipesData, setRecipesData] = useState([]);

  const history = useHistory();

  // const { data, search, recipesData } = useContext(RecipesContext);

  useEffect(() => {
    const pathName = history.location.pathname;

    const data = async (option, text) => {
      const isFood = pathName === '/foods';
      if (isFood && text.length > 0) {
        const dataFood = await fetchFoods(option, text);
        setRecipesData(dataFood.meals);
      } else if (!isFood && text.length > 0) {
        const dataDrink = await fetchDrinks(option, text);
        setRecipesData(dataDrink.drinks);
      }
    };

    data(search.option, search.text);
  }, [search, history.location.pathname]);

  useEffect(() => {
    const checkResult = () => {
      const isFood = history.location.pathname === '/foods';
      if (recipesData.length === 1 && isFood) {
        history.push(`/foods/${recipesData[0].idMeal}`);
      } else if (!isFood && recipesData.length === 1) {
        history.push(`/drinks/${recipesData[0].idDrink}`);
      }
    };

    checkResult();
  }, [recipesData, history]);

  const contextValue = {
    search,
    setSearch,
    recipesData,
    // data,
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
