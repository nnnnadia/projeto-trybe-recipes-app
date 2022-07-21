import React, { useContext } from 'react';
import { CardMedia, Typography } from '@mui/material';
import DetailsContext from '../../context/DetailsContext';

function VideoMedia() {
  const { details } = useContext(DetailsContext);

  const editUrlVideo = () => {
    if (details.strYoutube) {
      const initialUrl = details.strYoutube;
      const edited = initialUrl.replace('watch?v=', 'embed/');

      return edited;
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Video
      </Typography>
      <CardMedia
        sx={ { mb: 1 } }
        component="iframe"
        data-testid="video"
        src={ editUrlVideo() }
      />
    </>
  );
}

export default VideoMedia;
