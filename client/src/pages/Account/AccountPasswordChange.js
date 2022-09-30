import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { showAlert } from '../../utils/alert';

import validator from 'validator';

const AccountPasswordChange = () => {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      validator.isEmpty(passwordCurrent) ||
      validator.isEmpty(password) ||
      validator.isEmpty(passwordConfirm)
    ) {
      showAlert('error', 'Please input required field');
    } else {
      try {
        const res = await axios({
          method: 'PATCH',
          url: `/api/v1/users/updateMyPassword`,
          data: {
            passwordCurrent,
            password,
            passwordConfirm,
          },
        });

        console.log(res.data.data);
        setUser(res.data.data.user);

        if (res.status === 200) {
          showAlert('success', 'Successfully changed password!');
          navigate('/');
        }
      } catch (err) {
        console.log(err.response.data);
        const errMsg = err.response.data.message.includes(
          'minimum allowed length'
        );
        if (errMsg) {
          showAlert('error', 'Password should be 8 characters minimum');
        }
        showAlert('error', err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form className="form form-user-settings">
          <div className="form__group">
            <label className="form__label" htmlFor="password-current">
              Current password:*
            </label>
            <input
              className="form__input"
              id="password-current"
              name="passwordCurrent"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              New password:*
            </label>
            <input
              className="form__input"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" htmlFor="password-confirm">
              Confirm password:*
            </label>
            <input
              className="form__input"
              id="password-confirm"
              name="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="form__group right">
            <button
              className="btn btn--small btn--green"
              onClick={handleChangePasswordSubmit}
            >
              Save password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountPasswordChange;
