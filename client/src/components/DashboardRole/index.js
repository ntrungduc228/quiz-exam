import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import StudentLayout from '../../layouts/StudentLayout';
import AdminLayout from '../../layouts/AdminLayout';
import TeacherLayout from '../../layouts/TeacherLayout';
import StudentDashboard from '../../views/student/Dashboard';
import TeacherDashboard from '../../views/teacher/Dashboard';
import AdminDashboard from '../../views/admin/Dashboard';

import { ROLES, DASHBOARD_ROUTE } from '../../config/constant';
import { logout } from '../../store/slices/auth';

const DashboardRole = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector((state) => state.auth);
  const { user } = account;

  const handleLogOut = () => {
    dispatch(logout());
    history.push('/signin');
  };

  // switch (user?.role) {
  //   case ROLES.admin: {
  //     return (
  //       <AdminLayout>
  //         <AdminDashboard />
  //       </AdminLayout>
  //     );
  //   }
  //   case ROLES.teacher: {
  //     return (
  //       <TeacherLayout>
  //         <TeacherDashboard />
  //       </TeacherLayout>
  //     );
  //   }
  //   case ROLES.student: {
  //     return (
  //       <StudentLayout>
  //         <StudentDashboard />
  //       </StudentLayout>
  //     );
  //   }
  //   default:
  //     dispatch(logout());
  //     return <Redirect to={'/400'} />;
  // }

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
  return <div>dashboard role</div>;
};

export default DashboardRole;
