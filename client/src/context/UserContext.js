import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('isActive')) || false
  );

  // const [isLoggedIn, setIsLoggedIn] = useState(false, () => {
  //   const localData = localStorage.getItem('isActive');
  //   return localData ? JSON.parse(localData) : false;
  // });

  if (isLoggedIn) {
    localStorage.setItem('isActive', true);
  }

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;

    if (isLoggedIn) {
      getCurrentUser();
    }
  }, [isLoggedIn]);

  const getCurrentUser = () => {
    axios
      .get(`/api/v1/users/isLoggedIn`)
      .then((res) => {
        setUser(res.data.currentUser);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
