const setDrinkByName = async (nome) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`)
  .then((response) => response.json())
  .then((response) => response.results)
  .catch((error) => error);

export default setDrinkByName;
