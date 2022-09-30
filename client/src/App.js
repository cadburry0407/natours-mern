import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tour from './pages/Tour';
import Header from './pages/Header';
import Footer from './pages/Footer';

import Login from './pages/Login';
import Account from './pages/Account/Account';

import { UserContextProvider } from './context/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour/:slug" element={<Tour />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account/settings" element={<Account />} />
      </Routes>
      <Footer />
    </UserContextProvider>
  );
};

export default App;
