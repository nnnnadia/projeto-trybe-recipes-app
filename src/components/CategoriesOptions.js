import { Button, ButtonGroup } from '@mui/material';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { CategoriesOptionsGrid } from '../styles/StyledComponents';

function CategoriesOptions() {
  const {
    categoriesFood,
    categoriesDrink,
    filterCategory,
    setFilterCategory,
    setSearch,
  } = useContext(RecipesContext);

  const history = useHistory();

  const MAX_ITEMS = 5;

  const categoriesToShow = () => {
    if (history.location.pathname === '/foods') {
      return categoriesFood;
    }
    return categoriesDrink;
  };

  const changeCategoryToogle = (category) => {
    if (filterCategory !== category) {
      setFilterCategory(category);
    } else {
      setFilterCategory('All');
      setSearch({
        text: '',
        option: 'ingredients',
      });
    }
  };

  const showAll = () => {
    setFilterCategory('All');
  };

  return (
    <ButtonGroup variant="text" aria-label="text button group">
      <CategoriesOptionsGrid container justifyContent="center" wrap="wrap">
        {categoriesToShow()
          .slice(0, MAX_ITEMS)
          .map(({ strCategory }) => (
            <Button
              size="small"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              onClick={ () => changeCategoryToogle(strCategory) }
            >
              {strCategory}
            </Button>
          ))}
        <Button
          size="small"
          type="button"
          data-testid="All-category-filter"
          onClick={ showAll }
        >
          All
        </Button>
      </CategoriesOptionsGrid>
    </ButtonGroup>
  );
}

export default CategoriesOptions;
