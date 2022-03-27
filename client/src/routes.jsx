import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, Login, Signup } from './components';
import { UserContext } from './contexts.js';

export const RenderRoutes = () => {
  const user = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/signup'
        element={user ? <Navigate to='/' replace /> : <Signup />}
      />
      <Route
        path='/login'
        element={user ? <Navigate to='/' replace /> : <Login />}
      />
    </Routes>
  );
};
