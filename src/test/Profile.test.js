import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando página Profile', () => {
  it('Testando se os elementos são renderizados corretamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const userEmail = screen.getByTestId('profile-email');
    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const foodsButton = screen.getByTestId('food-bottom-btn');

    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(foodsButton).toBeInTheDocument();
  });

  it('Testando se ao clicar em Done Recipes é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const doneButton = screen.getByTestId('profile-done-btn');

    userEvent.click(doneButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testando se ao clicar em Favorite Recipes é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testando se ao clicar em Logout é redirecionado e o localStorage é limpo', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const logoutButton = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutButton);

    expect(history.location.pathname).toBe('/');

    expect(localStorage.getItem('email')).toBeNull();
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();
    expect(localStorage.getItem('doneRecipes')).toBeNull();
    expect(localStorage.getItem('doneRecipes')).toBeNull();
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
  });
});
