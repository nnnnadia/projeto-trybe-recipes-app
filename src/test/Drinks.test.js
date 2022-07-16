import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando página Foods', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando se faz requisição corretamente buscando pelo nome', async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo14@gmail.com');
    userEvent.type(password, '1234567');

    userEvent.click(buttonLogin);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkIcon);

    const searchIcon = await screen.findByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'rum');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    const firstCard = await screen.findByTestId('0-recipe-card');

    expect(firstCard).toBeInTheDocument();
  });

  it('Testando se redireciona para a página de detalhes caso haja apenas 1', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo14@gmail.com');
    userEvent.type(password, '1234567');

    userEvent.click(buttonLogin);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkIcon);

    const searchIcon = await screen.findByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
});
