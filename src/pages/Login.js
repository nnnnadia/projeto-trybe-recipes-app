import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveStorageUserData } from '../services/userLocalStorage';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

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
    const { history } = props;
    history.push('/foods');
  };

  return (
    <div>
      <label htmlFor="email">
        Digite seu email:
        <input
          id="email"
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Digite sua senha:
        <input
          id="password"
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ disabled }
        onClick={ handleLogin }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
