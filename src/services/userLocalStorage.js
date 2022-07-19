export const readStorageUserData = () => {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }

  return JSON.parse(localStorage.getItem('user'));
};

export const saveStorageUserData = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
