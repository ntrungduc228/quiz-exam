import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../config/constant';

const GuestGuard = ({ children, allowedRoles }) => {
  const account = useSelector((state) => state.auth);
  const { isLoggedIn } = account;

  if (isLoggedIn) {
    return <Redirect to={BASE_URL} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default GuestGuard;
