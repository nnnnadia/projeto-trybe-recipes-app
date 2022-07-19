import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const EMAIL = 'grupo14@gmail.com';
const RECIPE_CARD = '0-recipe-card';
const SIX = 6;

describe('Testando página de RecipeDetails', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando se os elementos são renderizados corretamente para comidas', async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    await waitFor(
      () => {
        const corbaRecipe = screen.getByTestId(RECIPE_CARD);
        userEvent.click(corbaRecipe);
      },
      { timeout: 4000 },
    );

    const firstIngredient = await screen.findByTestId(
      '0-ingredient-name-and-measure',
    );
    const recipeImg = screen.getByTestId('recipe-photo');
    const buttonShare = screen.getByTestId('share-btn');
    const buttonFavorites = screen.getByTestId('favorite-btn');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const ingredients = screen.getByRole('list');
    const instructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');
    const recomendations = screen.getAllByRole('link');
    const startButton = screen.getByRole('button', { name: 'Start Recipe' });

    expect(firstIngredient).toBeInTheDocument();
    expect(recipeImg).toBeInTheDocument();
    expect(buttonShare).toBeInTheDocument();
    expect(buttonFavorites).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recomendations).toHaveLength(SIX);
    expect(startButton).toBeInTheDocument();
  });

  it('Testando se os elementos são renderizados corretamente para bebidas', async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkButton);

    await waitFor(
      () => {
        const ggRecipe = screen.getByTestId(RECIPE_CARD);
        userEvent.click(ggRecipe);
      },
      { timeout: 4000 },
    );

    const firstIngredient = await screen.findByTestId(
      '0-ingredient-name-and-measure',
    );
    const recipeImg = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const buttonShare = screen.getByTestId('share-btn');
    const buttonFavorites = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const ingredients = screen.getByRole('list');
    const instructions = screen.getByTestId('instructions');
    const recomendations = screen.getAllByRole('link');
    const startButton = screen.getByRole('button', { name: 'Start Recipe' });

    expect(firstIngredient).toBeInTheDocument();
    expect(recipeImg).toBeInTheDocument();
    expect(buttonShare).toBeInTheDocument();
    expect(buttonFavorites).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recomendations).toHaveLength(SIX);
    expect(startButton).toBeInTheDocument();
  });

  it(`Testando se ao clicar no  botão Share 
     a mensagem "Link copied!" é renderizada para a página de comidas`, async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    await waitFor(
      () => {
        const h3Recipe = screen.queryByRole('heading', {
          name: /corba/i,
        });
        expect(h3Recipe).toBeInTheDocument();
        userEvent.click(h3Recipe);
      },
      { timeout: 4000 },
    );

    const buttonShare = screen.getByTestId('share-btn');
    expect(buttonShare).toBeInTheDocument();
    userEvent.click(buttonShare);
    expect(copy).toHaveBeenCalled();

    const mensage = screen.queryByText(/Link copied/i);
    expect(mensage).toBeInTheDocument();
  });

  it(`Testando se ao clicar no  botão Share 
     a mensagem "Link copied!" é renderizada para a página de bebidas`, async () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '1234567');

    userEvent.click(button);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkButton);

    await waitFor(
      () => {
        const ggRecipe = screen.getByTestId(RECIPE_CARD);
        userEvent.click(ggRecipe);
      },
      { timeout: 4000 },
    );

    const buttonShare = screen.getByTestId('share-btn');
    expect(buttonShare).toBeInTheDocument();
    userEvent.click(buttonShare);
    expect(copy).toHaveBeenCalled();

    const mensage = screen.queryByText(/Link copied/i);
    expect(mensage).toBeInTheDocument();
  });
});
