import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveStorageUserData } from '../services/userLocalStorage';
import '../styles/Login.css';

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
    <div className="login-container">

      <div>
        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-chef-professions-woman-diversity-flaticons-lineal-color-flat-icons.png" alt="logo" />
        <h2 className="title-login">App de Receitas</h2>
      </div>
      <div className="input-container">
        <label className="label-login" htmlFor="email">
          Email:
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="Digite seu email: "
            value={ email }
            className="input-login"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label className="label-login" htmlFor="password">
          Senha:
          <input
            id="password"
            data-testid="password-input"
            type="password"
            value={ password }
            placeholder="Digite sua senha:"
            className="input-login"
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
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
