import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const EMAIL = 'grupo14@gmail.com';

describe('Testando página Foods', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando se faz requisição corretamente buscando pelo nome', async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    const searchIcon = await screen.findByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    const firstCard = await screen.findByTestId('0-recipe-card');

    expect(firstCard).toBeInTheDocument();
  });

  it('Testando se redireciona para a página de detalhes caso haja apenas 1', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    const searchIcon = await screen.findByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52771');
    });
  });

  it('Testando se exibe alerta quando nenhuma receita é encontrada', async () => {
    jest.spyOn(global, 'fetch');
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    const searchIcon = await screen.findByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'xablau');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    });
  });

  it('Testando se a busca por categoria funciona', async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );

      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    }, { timeout: 4000 });

    const beefButton = screen.getByTestId('Beef-category-filter');
    const breakfastButton = screen.getByTestId('Breakfast-category-filter');
    const chickenButton = screen.getByTestId('Chicken-category-filter');
    const desertButton = screen.getByTestId('Dessert-category-filter');
    const goatButton = screen.getByTestId('Goat-category-filter');
    const allButton = screen.getByTestId('All-category-filter');

    userEvent.click(beefButton);
    userEvent.click(breakfastButton);
    userEvent.click(breakfastButton);
    userEvent.click(chickenButton);
    userEvent.click(desertButton);
    userEvent.click(goatButton);
    userEvent.click(allButton);
    userEvent.click(beefButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat');
    });

    const firstRecipe = screen.getByTestId('1-recipe-card');
    const corbaRecipe = screen.getByText('Corba');

    expect(firstRecipe).toBeInTheDocument();
    expect(corbaRecipe).toBeInTheDocument();
  });
});
