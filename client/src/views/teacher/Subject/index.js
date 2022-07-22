import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getAllSubjects } from '../../../store/slices/subject';

const Subject = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const { subjects } = useSelector((state) => state.subject);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects())
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log(err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });
  }, [dispatch, history]);

  useEffect(() => {
    setSubjectList(subjects);
  }, [subjects]);

  const columns = [
    {
      dataField: 'subjectId',
      text: 'Mã môn học',
      sort: true
    },
    {
      dataField: 'name',
      text: 'Tên môn học',
      sort: true
    }
  ];

  return (
    <>
      <Row>
        <Col>
          <TableList
            isShowButtonCreate={false}
            keyField="subjectId"
            title={`Danh sách môn học: ${subjectList.length}`}
            dataList={subjectList}
            columns={columns}
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
          ></TableList>
        </Col>
      </Row>
    </>
  );
};

export default Subject;
