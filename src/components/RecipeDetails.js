import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import RecipesContext from '../context/RecipesContext';
import DetailsContext from '../context/DetailsContext';
import Recommended from './Recommended';
import {
  VideoMedia,
  RecipeDetailsTitle,
  IngredientsList,
} from './RecipeDetailsComponents';
import { FixedFooter } from '../styles/StyledComponents';

function RecipeDetails() {
  const { isFood } = useContext(RecipesContext);

  const {
    details,
    done,
    inProgress,
    handlePush,
  } = useContext(DetailsContext);

  return (
    <>
      <Card sx={ { maxWidth: 345, mt: 1 } }>
        <CardMedia
          component="img"
          height="240"
          image={ details.strMealThumb || details.strDrinkThumb }
          alt="Imagem da receita"
          data-testid="recipe-photo"
        />
        <RecipeDetailsTitle
          details={ details }
        />
        <CardContent sx={ { pt: 0 } }>
          { (details.strCategory || details.strAlcoholic)
            && <Chip
              sx={ { mb: 2 } }
              label={ isFood ? details.strCategory : details.strAlcoholic }
              data-testid="recipe-category"
            /> }
          <IngredientsList details={ details } inProgress={ false } />
          <Typography variant="h5" gutterBottom>
            Instructions
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            data-testid="instructions"
          >
            {details.strInstructions}
          </Typography>
          {isFood && (
            <VideoMedia />
          )}
          <Recommended />
        </CardContent>
      </Card>
      {!done && (
        <FixedFooter data-testid="start-recipe-btn">
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={ handlePush }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </Button>
        </FixedFooter>
      )}
    </>
  );
}

export default RecipeDetails;
