import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function Findjobprotected({ user, children }) {
  if (user) {
    return <Outlet />;
  }

  
    return <Navigate to={'/login'}></Navigate>
  
}

export default Findjobprotected;
