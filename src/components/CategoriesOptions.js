import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function CategoriesOptions() {
  const {
    categoriesFood,
    categoriesDrink,
    setFilterCategory } = useContext(RecipesContext);

  const history = useHistory();

  const MAX_ITEMS = 5;

  const categoriesToShow = () => {
    if (history.location.pathname === '/foods') {
      return categoriesFood;
    }
    return categoriesDrink;
  };

  return (
    <div>
      {categoriesToShow()
        .slice(0, MAX_ITEMS)
        .map(({ strCategory }) => (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ () => setFilterCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilterCategory('All') }
      >
        All
      </button>
    </div>
  );
}

export default CategoriesOptions;
