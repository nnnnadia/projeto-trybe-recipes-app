import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();

  const { setRecipesData, setFilterCategory } = useContext(RecipesContext);

  const handleClick = (pathName) => {
    history.push(pathName);
    setRecipesData([]);
    setFilterCategory('All');
  };

  return (
    <footer className="fixarRodape" data-testid="footer">
      <button
        type="button"
        onClick={ () => handleClick('/drinks') }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Bebidas" />
      </button>
      <button
        type="button"
        onClick={ () => handleClick('/foods') }
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="Comidas" />
      </button>
    </footer>
  );
}

export default Footer;
