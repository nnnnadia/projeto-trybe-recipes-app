import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { clearLocalStorage } from '../../services/userLocalStorage';

function ProfileMenu() {
  const history = useHistory();

  const handlePush = (pathName) => {
    if (pathName === '/') {
      clearLocalStorage();
    }

    history.push(pathName);
  };

  return (
    <ButtonGroup variant="contained" size="small">
      <Button
        onClick={ () => handlePush('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </Button>
      <Button
        onClick={ () => handlePush('/favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </Button>
      <Button
        onClick={ () => handlePush('/') }
        data-testid="profile-logout-btn"
      >
        Logout
      </Button>
    </ButtonGroup>
  );
}

export default ProfileMenu;
