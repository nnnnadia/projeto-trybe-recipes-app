import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o Footer', () => {
  it('Verificando o botão de drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const elementDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(elementDrinks).toBeInTheDocument();

    const ElementImg = screen.getAllByRole('img');

    expect(ElementImg[2]).toHaveAttribute('src', 'drinkIcon.svg');

    userEvent.click(elementDrinks);

    expect(history.location.pathname).toBe('/drinks');
  });
  it('Verificando o botão de Foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const elementFoods = screen.getByTestId('food-bottom-btn');
    expect(elementFoods).toBeInTheDocument();

    const ElementImg = screen.getAllByRole('img');
    expect(ElementImg[3]).toHaveAttribute('src', 'mealIcon.svg');

    userEvent.click(elementFoods);

    expect(history.location.pathname).toBe('/foods');
  });
});
