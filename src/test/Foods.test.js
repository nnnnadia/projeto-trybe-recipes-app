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
});
