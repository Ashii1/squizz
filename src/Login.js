// Login.js
import React from 'react';

const Login = ({ setUsername, onLogin }) => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
