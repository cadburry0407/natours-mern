import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  useEffect(() => {
    const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(getCurrentUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
