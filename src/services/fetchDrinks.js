const endpointBase = 'https://www.thecocktaildb.com/api/json/v1/1/';
const endpointBaseCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const endpointBaseDetails = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const endpointComplement = (searchOption) => {
  switch (searchOption) {
  case 'ingredient':
    return 'filter.php?i=';
  case 'first-letter':
    return 'search.php?f=';
  default:
    return 'search.php?s=';
  }
};

const fetchDrinks = async (searchOption = '', searchText = '') => {
  const result = fetch(
    endpointBase + endpointComplement(searchOption) + searchText,
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

const fetchCategoriesDrinks = async () => {
  const result = fetch(`${endpointBase}list.php?c=list`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

const fetchDrinksByCategory = async (category) => {
  const result = fetch(`${endpointBaseCategory}${category}`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

const fetchDetailsDrink = async (id) => {
  const result = fetch(`${endpointBaseDetails}${id}`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

export {
  fetchDrinks,
  fetchCategoriesDrinks,
  fetchDrinksByCategory,
  fetchDetailsDrink,
};
