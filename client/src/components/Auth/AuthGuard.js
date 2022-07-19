import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES, STATE } from '../../config/constant';
import DashboardRole from '../DashboardRole';

const AuthGuard = ({ children, allowedRoles, path, ...rest }) => {
  const account = useSelector((state) => state.auth);
  const { isLoggedIn, user } = account;

  // console.log('state change', account, allowedRoles, user);

  useEffect(() => {
    if (!isLoggedIn) {
      return <Redirect to={'/signin'} />;
    }
  }, [isLoggedIn]);

  if (user?.state === STATE.needConfirm) {
    return <Redirect to={'/verify-account'} />;
  }

  if (!isLoggedIn) {
    return <Redirect to={'/signin'} />;
  }

  let existsRole = Object.values(ROLES).includes(user?.role);
  if (!existsRole) {
    return <Redirect to={'/403'} />;
  }

  if (!allowedRoles.includes(user?.role)) {
    children = <DashboardRole {...rest} />;
  }

  return children;
};

export default AuthGuard;
