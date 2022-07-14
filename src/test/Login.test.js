import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando a tela de Login', () => {
  it('Verificando os elementos na tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Testando os inputs e o botão', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo14@gmail.com');
    userEvent.type(password, '123456');

    expect(button).toHaveProperty('disabled');

    userEvent.type(password, '123456');

    expect(button).not.toHaveProperty('disabled', 'false');

    userEvent.click(button);

    const local = JSON.parse(localStorage.getItem('user')).email;
    const emailText = 'grupo14@gmail.com';

    expect(local).toBe(emailText);

    expect(history.location.pathname).toBe('/foods');
  });
});
