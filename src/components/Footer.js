import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { FixedFooter } from '../styles/StyledComponents';

function Footer() {
  const history = useHistory();

  const { setRecipesData, setFilterCategory } = useContext(RecipesContext);

  const handleClick = (pathName) => {
    history.push(pathName);
    setRecipesData([]);
    setFilterCategory('All');
  };

  return (
    <FixedFooter data-testid="footer">
      <BottomNavigation
        showLabels={ false }
      >
        <BottomNavigationAction
          label="drinks"
          icon={
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Bebidas" />
          }
          onClick={ () => handleClick('/drinks') }
        />
        <BottomNavigationAction
          label="foods"
          icon={
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="Comidas" />
          }
          onClick={ () => handleClick('/foods') }
        />
      </BottomNavigation>
    </FixedFooter>
  );
}

export default Footer;
