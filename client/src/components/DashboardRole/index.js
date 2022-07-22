import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { ROLES, DASHBOARD_ROUTE } from '../../config/constant';
import { logout } from '../../store/slices/auth';

const DashboardRole = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector((state) => state.auth);
  const { user } = account;

  const handleLogOut = () => {
    dispatch(logout());
    history.push('/signin');
  };

  switch (user?.role) {
    case ROLES.admin: {
      return <Redirect to={DASHBOARD_ROUTE.admin.path} />;
    }
    case ROLES.teacher: {
      return <Redirect to={DASHBOARD_ROUTE.teacher.path} />;
    }
    case ROLES.student: {
      return <Redirect to={DASHBOARD_ROUTE.student.path} />;
    }
    default:
      handleLogOut();
      return <Redirect to={'/signin'} />;
  }
  // return children;
};

export default DashboardRole;
