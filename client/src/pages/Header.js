import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Logo from '../img/logo-white.png';
import { showAlert } from '../utils/alert';

const Header = () => {
  const { user, setUser, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `/api/v1/users/logout`,
      });

      // console.log(res);

      if (res.status === 200) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        setUser('');
        setIsLoggedIn(false);
        localStorage.removeItem('isActive');

        showAlert('success', 'Logged out!');
        navigate(`/`, { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (user) {
    return (
      <>
        <header className="header">
          <nav className="nav nav--tours">
            <Link to="/" className="nav__el">
              All tours
            </Link>
          </nav>
          <div className="header__logo">
            <Link to="/">
              <img src={Logo} alt="Natours logo" />
            </Link>
          </div>
          <nav className="nav nav--user">
            <Link to="/" className="nav__el" onClick={logout}>
              Logout
            </Link>
            <Link to="/account/settings" className="nav__el">
              <img
                src={`/img/users/${user.photo}`}
                alt={`${user.name}`}
                className="nav__user-img"
              />
              <span>{user.name}</span>
            </Link>
          </nav>
        </header>
      </>
    );
  }

  return (
    <>
      <header className="header">
        <nav className="nav nav--tours">
          <Link to="/" className="nav__el">
            All tours
          </Link>
        </nav>
        <div className="header__logo">
          <Link to="/">
            <img src={Logo} alt="Natours logo" />
          </Link>
        </div>
        <nav className="nav nav--user">
          <Link to="/login" className="nav__el">
            Log in
          </Link>
          <button className="nav__el nav__el--cta">Sign up</button>
        </nav>
      </header>
    </>
  );
};

export default Header;
