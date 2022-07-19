export const readStorageDoneRecipes = () => {
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
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

export const readStorageInProgressRecipes = () => {
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        cocktails: {},
        meals: {},
      }),
    );
  }

  return JSON.parse(localStorage.getItem('inProgressRecipes'));
};

export const saveStorageInProgressRecipes = (group, id, list) => {
  const inLocalStorage = readStorageInProgressRecipes();

  const newData = {
    ...inLocalStorage,
    [group]: { ...inLocalStorage[group], [id]: list },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newData));
};

// export const saveStorageInProgressRecipes = (recipe, key) => {
//   // if (!localStorage.getItem('inProgressRecipes')) {
//   //   localStorage.setItem(
//   //     'inProgressRecipes',
//   //     JSON.stringify({ [key]: recipe }),
//   //   );
//   // } else {
//   //   const oldData = JSON.parse(localStorage.getItem('inProgressRecipes'));
//   //   const newData = { ...oldData, [key]: { ...oldData[key], recipe } };
//   //   const newData = { ...oldData.cocktails, [key]: { ...oldData[key], recipe } };
//   //   localStorage.setItem('inProgressRecipes', JSON.stringify(newData));
//   // }
//   if (!localStorage.getItem('inProgressRecipes')) {
//     if (key === 'meals') {
//       const a = {
//         cocktails: {},
//         meals: { recipe },
//       };
//       localStorage.setItem('inProgressRecipes', JSON.stringify(a));
//     } else {
//       const a = {
//         cocktails: { recipe },
//         meals: {},
//       };
//       localStorage.setItem('inProgressRecipes', JSON.stringify(a));
//     }
//   } else {
//     const oldData = JSON.parse(localStorage.getItem('inProgressRecipes'));
//     if (key === 'meals') {
//       const a = {
//         cocktails: {
//           ...oldData.cocktails,
//         },
//         meals: {
//           ...oldData.meals, recipe,
//         },
//       };
//       localStorage.setItem('inProgressRecipes', JSON.stringify(a));
//     } else {
//       const a = {
//         cocktails: {
//           ...oldData.cocktails, recipe,
//         },
//         meals: {
//           ...oldData.meals,
//         },
//       };
//       localStorage.setItem('inProgressRecipes', JSON.stringify(a));
//     }
//   }
// };

export const readStorageFavoriteRecipes = () => {
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
};

export const saveStorageFavoriteRecipes = (recipe) => {
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
  } else {
    const oldData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newData = [...oldData, recipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  }
};
