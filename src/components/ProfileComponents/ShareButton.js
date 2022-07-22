import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { Fab, Stack } from '@mui/material';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton({ type, id, index }) {
  const [copied, setCopied] = useState(false);

  const clickShare = () => {
    const INTERVAL_TIME = 3000;
    if (type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
    setCopied(true);
    setInterval(() => setCopied(false), INTERVAL_TIME);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={ { position: 'absolute', right: 10, top: 10 } }
    >
      {copied && <span>Link copied!</span>}
      <Fab
        aria-label="share"
        onClick={ () => clickShare() }
      >
        <img
          src={ shareIcon }
          alt="compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </Fab>
    </Stack>);
}

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default ShareButton;
