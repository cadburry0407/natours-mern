import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AccoundSidebar from './AccoundSidebar';
import AccountPasswordChange from './AccountPasswordChange';
import AccountSettings from './AccountSettings';

import { UserContext } from '../../context/UserContext';

const Account = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    document.title = 'Natours | Account Settings';
  }, []);

  useEffect(() => {
    // console.log(location);

    // console.log(location.pathname);

    if (!isLoggedIn) {
      navigate(`/`);
    }
  }, [isLoggedIn, navigate]);

  // useEffect(() => {
  //   if (!user) {
  //     navigate(`/`);
  //   }
  // }, [user, navigate]);

  // useEffect(() => {
  //   console.log('true');
  //   if (!isLoadings) {
  //     console.log('false');
  //     navigate(`/`);
  //   }

  //   return () => {
  //     setIsLoadings(true);
  //   };
  // }, [isLoadings, navigate]);

  // setIsLoadings(true);

  return (
    <>
      <main className="main">
        <div className="user-view">
          <AccoundSidebar />
          <div className="user-view__content">
            <AccountSettings />
            <div className="line">&nbsp;</div>
            <AccountPasswordChange />
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
