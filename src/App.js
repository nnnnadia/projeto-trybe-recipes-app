import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import FoodRecipeInProgress from './pages/FoodRecipeInProgress';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ FoodRecipe } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route exact path="/foods/:id/in-progress" component={ FoodRecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkRecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
