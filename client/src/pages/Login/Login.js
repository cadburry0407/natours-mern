import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import { showAlert } from '../../utils/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsLoggedIn, user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Natours | Login';
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: 'POST',
        url: `/api/v1/users/login`,
        data: {
          email,
          password,
        },
      });
      setUser(res.data.data.user);
      setIsLoggedIn(true);

      if (res.status === 200) {
        showAlert('success', 'Logged in successfully!');
        navigate(`/`, { replace: true });
      }
    } catch (err) {
      console.log(err);

      if (err.response.status === 401) {
        console.log(err.response.data.message);

        showAlert('error', err.response.data.message);
      }
    }
  };

  return (
    <>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

          <form className="form">
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required="required"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required="required"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green" onClick={loginSubmit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
