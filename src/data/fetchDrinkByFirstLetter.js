const setDrinkByName = async (firstLetter) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
  .then((response) => response.json())
  .then((response) => response.results)
  .catch((error) => error);

export default setDrinkByName;
