import React, { useState } from 'react';
import { $host } from '../../http';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const setErrorMessage = (error) => {
    setError(error);
    setTimeout(() => {
      setError('');
    }, 6000);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await $host.post('/login', { email, password });
      localStorage.setItem('id', data.id);
      localStorage.setItem('username', data.username);
      cookies.set('accessToken', data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
    } catch (error) {
      const errorMessage = error.response.data.error;
      setErrorMessage(errorMessage);
    }
    window.location.href = "/";
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={submitLogin}>
        {error && <div>{error}</div>}
        <h3>LOGIN</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            value={email}
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <div>
          Not have account? <Link to="/signup">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
