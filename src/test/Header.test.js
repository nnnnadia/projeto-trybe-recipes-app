import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente Header', () => {
  it('Verificando os elementos na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('Verificando se o usuário e direcionado para a página de perfil', () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('user', JSON.stringify({ email: 'trybe@teste.com' }));
    history.push('/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Verificando se a barra de pesquisa aparece ao clicar no botão', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const dataTestIdSearch = 'search-input';

    const searchIcon = screen.getByTestId('search-top-btn');

    expect(screen.queryByTestId(dataTestIdSearch)).not.toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(screen.getByTestId(dataTestIdSearch)).toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(screen.queryByTestId(dataTestIdSearch)).not.toBeInTheDocument();
  });
});
