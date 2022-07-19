import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { readStorageDoneRecipes } from '../services/recipesLocalStorage';

// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]

function DoneRecipes() {
  const [copied, setCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const done = readStorageDoneRecipes();
    setDoneRecipes(done);
  }, []);

  useEffect(() => {
    if (filter !== 'all') {
      const doneFiltered = doneRecipes.filter(
        (recipe) => recipe.type === filter,
      );
      setFilteredRecipes(doneFiltered);
    }
  }, [filter, doneRecipes]);

  const clickShare = (recipe) => {
    if (recipe.type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${recipe.id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${recipe.id}`);
    }
    setCopied(true);
  };

  const recipesToShow = () => {
    if (filter === 'all') {
      return doneRecipes;
    }
    return filteredRecipes;
  };

  return (
    <div>
      <Header pageTitle="Done Recipes" showSearchIcon={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ ({ target }) => setFilter(target.name) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ ({ target }) => setFilter(target.name) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ ({ target }) => setFilter(target.name) }
      >
        Drinks
      </button>
      {recipesToShow().map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt="Foto da receita"
          />
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'food'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </h5>
          <h5 data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </h5>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <button type="button" onClick={ () => clickShare(recipe) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="compartilhar"
            />
          </button>
          {copied && <span>Link copied!</span>}
          {recipe.tags.length > 0
            && recipe.tags.map((tag) => (
              <div key={ tag }>
                <span data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
