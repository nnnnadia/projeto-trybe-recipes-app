import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  fetchCategoriesDrinks,
  fetchCategoriesFoods,
  fetchDrinks,
  fetchDrinksByCategory,
  fetchFoods,
  fetchFoodsByCategory,
} from '../services';
import {
  readStorageDoneRecipes,
  readStorageFavoriteRecipes,
} from '../services/recipesLocalStorage';

function RecipesProvider({ children }) {
  const [search, setSearch] = useState({
    text: '',
    option: 'ingredients',
  });
  const [recipesData, setRecipesData] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [categoriesFood, setCategoriesFood] = useState([]);
  const [categoriesDrink, setCategoriesDrink] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isFood, setIsFood] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const data = async (option, text) => {
      if (isFood && text.length > 0) {
        const dataFood = await fetchFoods(option, text);
        setRecipesData(dataFood.meals);
      } else if (!isFood && text.length > 0) {
        const dataDrink = await fetchDrinks(option, text);
        setRecipesData(dataDrink.drinks);
      } else {
        setRecipesData([]);
      }
    };

    data(search.option, search.text);
  }, [search]);

  useEffect(() => {
    const checkResult = () => {
      if (recipesData && recipesData.length === 1 && isFood) {
        history.push(`/foods/${recipesData[0].idMeal}`);
      } else if (!isFood && recipesData && recipesData.length === 1) {
        history.push(`/drinks/${recipesData[0].idDrink}`);
      }
    };

    checkResult();
  }, [recipesData, history]);

  useEffect(() => {
    if (!recipesData) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipesData]);

  useEffect(() => {
    const initialFetch = async () => {
      const dataFood = await fetchFoods();
      const dataDrink = await fetchDrinks();
      const allCategoriesFood = await fetchCategoriesFoods();
      const allCategoriesDrink = await fetchCategoriesDrinks();

      setAllFoods(dataFood.meals);
      setAllDrinks(dataDrink.drinks);
      setCategoriesFood(allCategoriesFood.meals);
      setCategoriesDrink(allCategoriesDrink.drinks);
    };

    const getFavoritesFromLocalStorage = () => {
      setFavoriteRecipes(readStorageFavoriteRecipes());
    };

    const getDonesFromLocalStorage = () => {
      setDoneRecipes(readStorageDoneRecipes());
    };

    initialFetch();
    getFavoritesFromLocalStorage();
    getDonesFromLocalStorage();
  }, []);

  useEffect(() => {
    const filterFetch = async () => {
      if (isFood && filterCategory !== 'All') {
        const data = await fetchFoodsByCategory(filterCategory);
        return setFilteredData(data.meals);
      }

      if (!isFood && filterCategory !== 'All') {
        const data = await fetchDrinksByCategory(filterCategory);
        return setFilteredData(data.drinks);
      }

      return setFilteredData([]);
    };

    filterFetch();
  }, [filterCategory]);

  const handlePageOn = (pathName) => {
    history.push(pathName);
    const PATHNAME_ELEMENT = pathName.split('/')[1];
    const FOODS_PATHNAME = 'foods';
    setIsFood(PATHNAME_ELEMENT === FOODS_PATHNAME);
  };

  useEffect(() => {
    const { location: { pathname } } = history;
    handlePageOn(pathname);
  }, []);

  const contextValue = {
    search,
    setSearch,
    recipesData,
    setRecipesData,
    allFoods,
    allDrinks,
    categoriesFood,
    categoriesDrink,
    filterCategory,
    setFilterCategory,
    filteredData,
    favoriteRecipes,
    doneRecipes,
    isFood,
    handlePageOn,
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
