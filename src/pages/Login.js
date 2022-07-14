import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        Digite seu email:
        <input id="email" data-testid="email-input" type="email" />
      </label>
      <label htmlFor="password">
        Digite sua senha:
        <input id="password" data-testid="password-input" type="password" />
      </label>
      <button data-testid="login-submit-btn" type="button">
        Enter
      </button>
    </div>
  );
}

export default Login;
