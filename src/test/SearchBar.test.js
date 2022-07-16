import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';

describe('Testando página Foods', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando se faz requisição corretamente buscando pelo nome', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata',
    );
  });

  it('Testando se faz requisição corretamente buscando pelo ingrediente', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const radioIngredient = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
    );
  });

  it('Testando se faz requisição corretamente buscando pela primeira letra', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
    );
  });

  it('Testando se exibe alerta ao digitar mais de uma letra', async () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(alert).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    );
  });
});

describe('Testando página drinks', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando se faz requisição corretamente buscando pelo nome', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'margarita');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
    );
  });

  it('Testando se faz requisição corretamente buscando pelo ingrediente', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioIngredient = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'Gin');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin',
    );
  });

  it('Testando se faz requisição corretamente buscando pela primeira letra', async () => {
    const fetch = jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
    );
  });

  it('Testando se exibe alerta ao digitar mais de uma letra', async () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);

    history.push('/drinks');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(alert).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    );
  });
});
