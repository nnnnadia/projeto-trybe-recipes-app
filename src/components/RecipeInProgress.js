import React, { useContext } from 'react';
import { Button, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import RecipesContext from '../context/RecipesContext';
import DetailsContext from '../context/DetailsContext';
import { RecipeDetailsTitle, IngredientsList } from './RecipeDetailsComponents';
import { FixedFooter } from '../styles/StyledComponents';
import '../styles/RecipeDetails.css';

function RecipeInProgress() {
  const { isFood } = useContext(RecipesContext);

  const {
    details,
    indexIngredients,
    setIndexIngredients,
    finishButtonDisabled,
    handleClickFinish,
  } = useContext(DetailsContext);

  return (
    <>
      <Card sx={ { maxWidth: 345, mt: 1, mb: 2 } }>
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
          <IngredientsList
            details={ details }
            indexIngredients={ indexIngredients }
            setIndexIngredients={ setIndexIngredients }
            inProgress
          />
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
        </CardContent>
      </Card>
      <FixedFooter>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          data-testid="finish-recipe-btn"
          disabled={ finishButtonDisabled }
          onClick={ handleClickFinish }
        >
          Finish
        </Button>
      </FixedFooter>
    </>
  );
}

export default RecipeInProgress;
