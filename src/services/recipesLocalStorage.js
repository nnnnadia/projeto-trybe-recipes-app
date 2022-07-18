export const readStorageDoneRecipes = () => {
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([
        {
          id: 0,
          type: '',
          nationality: '',
          category: '',
          alcoholicOrNot: '',
          name: '',
          image: '',
          doneDate: '',
          tags: '',
        },
      ]),
    );
  }

  return JSON.parse(localStorage.getItem('doneRecipes'));
};

export const saveStorageDoneRecipes = (recipe) => {
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
  } else {
    const oldData = JSON.parse(localStorage.getItem('doneRecipes'));
    const newData = [...oldData, recipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newData));
  }
};
