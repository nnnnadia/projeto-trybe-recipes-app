const endpointBase = 'https://www.themealdb.com/api/json/v1/1/';
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

export default fetchFoods;
