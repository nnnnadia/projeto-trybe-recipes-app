import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { IconButton } from '@mui/material';
import shareIcon from '../../images/shareIcon.svg';
import RecipesContext from '../../context/RecipesContext';

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const { isFood } = useContext(RecipesContext);

  const { id } = useParams();

  const clickShare = () => {
    const INTERVAL_TIME = 3000;
    if (isFood) {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
    setCopied(true);
    setInterval(() => setCopied(false), INTERVAL_TIME);
  };

  return (
    <>
      {copied && <span>Link copied!</span>}
      <IconButton aria-label="share" onClick={ clickShare }>
        <img
          src={ shareIcon }
          alt="compartilhar"
          data-testid="share-btn"
        />
      </IconButton>
    </>
  );
}

export default ShareButton;
