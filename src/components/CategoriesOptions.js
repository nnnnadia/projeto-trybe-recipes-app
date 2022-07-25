import React, { useContext, useState } from 'react';
import {
  Box,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RecipesContext from '../context/RecipesContext';

function CategoriesOptions() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    categoriesFood,
    categoriesDrink,
    filterCategory,
    setFilterCategory,
    setSearch,
    isFood,
  } = useContext(RecipesContext);

  const categoriesToShow = () => {
    if (isFood) {
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
    setDrawerOpen(false);
  };

  const showAll = () => {
    setFilterCategory('All');
    setDrawerOpen(false);
  };

  const getCategoriesList = () => (
    <List>
      {categoriesToShow().map(({ strCategory }, index) => (
        <ListItem
          disablePadding
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
        >
          <ListItemButton
            onClick={ () => changeCategoryToogle(strCategory) }
          >
            <ListItemText primary={ strCategory } />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem
        disablePadding
        data-testid="All-category-filter"
      >
        <ListItemButton
          onClick={ showAll }
        >
          <ListItemText primary="All" />
        </ListItemButton>
      </ListItem>
    </List>);

  return (
    <>
      <Fab
        sx={ { mt: 2, mb: 2 } }
        variant="extended"
        color="secondary"
        onClick={ () => setDrawerOpen(true) }
      >
        <MenuIcon sx={ { mr: 1 } } />
        Categories
      </Fab>
      <Drawer
        anchor="left"
        open={ drawerOpen }
        onClose={ () => setDrawerOpen(false) }
      >
        <Box>
          {getCategoriesList()}
        </Box>
      </Drawer>
    </>
  );
}

export default CategoriesOptions;
