import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../../store/slices/message';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return <div> Dashboard admin</div>;
};

export default Dashboard;
