const endpointBase = 'https://www.themealdb.com/api/json/v1/1/';
const endpointBaseCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const endpointBaseDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

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

const fetchFoods = async (searchOption = '', searchText = '') => {
  const result = fetch(
    endpointBase + endpointComplement(searchOption) + searchText,
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

const fetchCategoriesFoods = async () => {
  const result = fetch(`${endpointBase}list.php?c=list`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

const fetchFoodsByCategory = async (category) => {
  const result = fetch(`${endpointBaseCategory}${category}`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

const fetchDetailsFood = async (id) => {
  const result = fetch(`${endpointBaseDetails}${id}`)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => error);

  return result;
};

export {
  fetchFoods,
  fetchCategoriesFoods,
  fetchFoodsByCategory,
  fetchDetailsFood,
};
