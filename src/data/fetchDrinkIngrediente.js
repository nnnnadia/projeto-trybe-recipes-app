const setDrinkByIngrediente = async (ingrediente) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
  .then((response) => response.json())
  .then((response) => response.results)
  .catch((error) => error);

export default setDrinkByIngrediente;
