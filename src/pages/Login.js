import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import { saveStorageUserData } from '../services/userLocalStorage';
import '../styles/Login.css';
import RecipesContext from '../context/RecipesContext';
import { AppTitle } from '../styles/StyledComponents';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { handlePageOn } = useContext(RecipesContext);

  useEffect(() => {
    const handleDisabled = () => {
      const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const six = 6;

      if (password.length > six && email.match(isValid)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    handleDisabled();
  }, [email, password]);

  const handleLogin = () => {
    saveStorageUserData(email);
    handlePageOn('/foods');
  };

  return (
    <Container fixed maxWidth="xs">
      <Box>
        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-chef-professions-woman-diversity-flaticons-lineal-color-flat-icons.png" alt="logo" />
        <AppTitle
          variant="h2"
          sx={ { textAlign: 'center' } }
        >
          App de Receitas
        </AppTitle>
      </Box>
      <Stack
        spacing={ 1 }
      >
        <TextField
          variant="filled"
          label="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="email-input"
        />
        <TextField
          variant="filled"
          type="password"
          label="Password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          data-testid="password-input"
        />
        <Button
          fullWidth
          variant="contained"
          disabled={ disabled }
          onClick={ handleLogin }
          data-testid="login-submit-btn"
        >
          Enter
        </Button>
      </Stack>
    </Container>
  );
}

export default Login;
