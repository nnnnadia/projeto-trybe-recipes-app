import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import {
//   mealsByName,
//   mealsByFirstLetter,
//   mealsByIngredients,
// } from '../helpers/mocks';

// const mockFetch = () => Promise.resolve({
//   json: () => Promise.resolve(mealsByName),
// });

describe('Testando o SearchBar', () => {
  // afterEach(() => jest.clearAllMocks());

  it('Verificando os elementos na tela', async () => {
    // jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { debug, history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchIcon = screen.getByTestId('search-top-btn');

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');
    // const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    // const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    // await waitFor(() => {
    //   expect(global.fetch).toHaveBeenCalled();
    //   expect(global.fetch).toHaveBeenCalledWith(
    //     'www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata',
    //   );
    // });

    debug();
  });
});
