import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
// import { maxWidth } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';

function CardRecipeDone({
  // id,
  // type,
  // nationality,
  // category,
  // alcoholicOrNot,
  // name,
  // image,
  // doneDate,
  tags,
}) {
  // const getCaption = () => {
  //   const captionString = '';
  //   captionString = nationality ?
  // };

  return (
    <Card sx={ { maxWidth: 500 } }>
      <CardMedia
        component="img"
        height="140"
        image={ image }
        data-testid={ `${index}-horizontal-image` }
      />
      <CardContent>
        <Divider>
          <Typography
            variant="caption"
            display="block"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { }
          </Typography>
        </Divider>
        <IconButton
          aria-label="share"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <ShareIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          data-testid={ `${index}-horizontal-name" ` }
        >
          { }
        </Typography>
        <Typography
          variant="body2"
          data-testid={ `${index}-horizontal-done-date` }
        >
          { }
        </Typography>
        { tags.map((tag) => (
          <Chip key={ tag } label={ tag } size="small" />
        ))}
      </CardContent>
    </Card>
  );
}

CardRecipeDone.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default CardRecipeDone;
