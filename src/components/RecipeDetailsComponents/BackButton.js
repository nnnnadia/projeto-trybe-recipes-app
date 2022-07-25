import React, { useContext } from 'react';
import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecipesContext from '../../context/RecipesContext';

function BackButton() {
  const { isFood, handlePageOn } = useContext(RecipesContext);

  const handleBackButton = () => {
    if (isFood) handlePageOn('/foods');
    if (!isFood) handlePageOn('/drinks');
  };

  return (
    <Fab
      aria-label="back"
      onClick={ handleBackButton }
      sx={ { position: 'absolute', left: 5, top: 13 } }
    >
      <ArrowBackIcon />
    </Fab>
  );
}

export default BackButton;
