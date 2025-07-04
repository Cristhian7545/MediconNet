import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const jwt = localStorage.getItem('jwt');
  return jwt ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
