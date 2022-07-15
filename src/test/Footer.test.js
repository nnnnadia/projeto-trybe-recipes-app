import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Testando o Footer', () => {
  it('Verificando o botão de drinks', () => {
    const { history } = renderWithRouter(<Footer />);

    const elementDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(elementDrinks).toBeInTheDocument();

    const ElementImg = screen.getAllByRole('img');

    expect(ElementImg[0]).toHaveAttribute('src', 'drinkIcon.svg');

    userEvent.click(elementDrinks);

    expect(history.location.pathname).toBe('/drinks');
  });
  it('Verificando o botão de Foods', () => {
    const { history } = renderWithRouter(<Footer />);

    const elementFoods = screen.getByTestId('food-bottom-btn');
    expect(elementFoods).toBeInTheDocument();

    const ElementImg = screen.getAllByRole('img');
    expect(ElementImg[1]).toHaveAttribute('src', 'mealIcon.svg');

    userEvent.click(elementFoods);

    expect(history.location.pathname).toBe('/foods');
  });
});
