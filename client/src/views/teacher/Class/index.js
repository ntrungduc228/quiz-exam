import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableList from '../../../components/TableList';
import errorJwt from '../../../utils/errorJwt';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/slices/auth';
import { getAllClasses } from '../../../store/slices/class';

const Class = () => {
  const [classList, setClassList] = useState([]);

  const { classes } = useSelector((state) => state.class);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllClasses())
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log('yeye', err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });
  }, []);

  useEffect(() => {
    setClassList(classes);
  }, [classes]);

  const columns = [
    {
      dataField: 'classId',
      text: 'Mã lớp',
      sort: true
    },
    {
      dataField: 'name',
      text: 'Tên lớp',
      sort: true
    }
  ];

  return (
    <React.Fragment>
      {' '}
      <TableList
        isShowButtonCreate={false}
        keyField="classId"
        title={`Danh sách lớp học: ${classList.length}`}
        dataList={classList}
        columns={columns}
        isShowModal={false}
        setIsShowModal={() => {}}
        handleCreateNew={() => {}}
      ></TableList>
    </React.Fragment>
  );
};

export default Class;
