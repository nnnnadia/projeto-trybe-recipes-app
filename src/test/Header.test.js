import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

describe('Testando o componente Header', () => {
  it('Verificando os elementos na tela', () => {
    renderWithRouter(<Header pageTitle="Foods" showSearchIcon />);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('Verificando se o usuário e direcionado para a página de perfil', () => {
    const { history } = renderWithRouter(
      <Header pageTitle="Foods" showSearchIcon />,
    );

    const profileIcon = screen.getByTestId('profile-top-btn');

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Verificando se a barra de pesquisa aparece ao clicar no botão', () => {
    renderWithRouter(<Header pageTitle="Foods" showSearchIcon />);

    const dataTestIdSearch = 'search-input';

    const searchIcon = screen.getByTestId('search-top-btn');

    expect(screen.queryByTestId(dataTestIdSearch)).not.toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(screen.getByTestId(dataTestIdSearch)).toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(screen.queryByTestId(dataTestIdSearch)).not.toBeInTheDocument();
  });
});
