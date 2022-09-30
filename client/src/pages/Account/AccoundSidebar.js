import React from 'react';

import { Link } from 'react-router-dom';

import Svg from '../../components/Svg';

const AccoundSidebar = () => {
  return (
    <>
      <nav className="user-view__menu">
        <ul className="side-nav">
          <li className="side-nav--active">
            <Link to="#">
              <Svg spriteName="icon-settings" />
              Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <Svg spriteName="icon-briefcase" />
              My bookings
            </Link>
          </li>
          <li>
            <Link to="#">
              <Svg spriteName="icon-star" />
              My reviews
            </Link>
          </li>
          <li>
            <Link to="#">
              <Svg spriteName="icon-credit-card" />
              Billing
            </Link>
          </li>
        </ul>
        {/* <div className="admin-nav">
          <h5 className="admin-nav__heading">Admin</h5>
          <ul className="side-nav">
            <li>
              <Link to="#">
                <Svg spriteName="icon-map" />
                Manage tours
              </Link>
            </li>
            <li>
              <Link to="#">
                <Svg spriteName="icon-users" />
                Manage users
              </Link>
            </li>
            <li>
              <Link to="#">
                <Svg spriteName="icon-star" />
                Manage reviews
              </Link>
            </li>
            <li>
              <Link to="#">
                <Svg spriteName="icon-briefcase" />
                Manage Bookings
              </Link>
            </li>
          </ul>
        </div> */}
      </nav>
    </>
  );
};

export default AccoundSidebar;
