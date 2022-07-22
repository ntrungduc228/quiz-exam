import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getListResult } from '../../../store/slices/score';
import { selectFilter } from 'react-bootstrap-table2-filter';
import { getAllSubjects } from '../../../store/slices/subject';
import { getAllClasses } from '../../../store/slices/class';

const Result = () => {
  const [scoreList, setScoreList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [classList, setClassList] = useState([]);

  const { scores } = useSelector((state) => state.score);
  const { subjects } = useSelector((state) => state.subject);
  const { classes } = useSelector((state) => state.class);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListResult())
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log(err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });

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
    setScoreList(scores);
  }, [scores]);

  useEffect(() => {
    let arr = classes.map((item) => ({ label: item.classId, value: item.classId }));
    setClassList([...arr]);
  }, [classes]);

  useEffect(() => {
    let arr = subjects.map((item) => ({ label: item.name, value: item.name }));
    setSubjectList([...arr]);
  }, [subjects]);

  const columns = [
    {
      dataField: 'scoreSubjectData.name',
      text: 'Môn học',
      sort: true,
      filter: selectFilter({
        options: subjectList
      })
    },
    {
      dataField: 'times',
      text: 'Lần thi',
      sort: true
    },
    {
      dataField: 'score',
      text: 'Điểm',
      sort: true
    },

    {
      dataField: 'studentId',
      text: 'Mã sinh viên',
      sort: true
    },
    {
      dataField: 'fullName',
      text: 'Họ tên',
      sort: true
    },
    {
      dataField: 'scoreStudentData.studentClassData.classId',
      text: 'Lớp',
      sort: true,
      filter: selectFilter({
        options: classList
      })
    },

    {
      dataField: 'date',
      text: 'Ngày thi',
      sort: true
    }
  ];

  return (
    <>
      <Row>
        <Col>
          <TableList
            isShowButtonCreate={false}
            keyField="keyField"
            title={`Danh sách kết quả: ${scoreList.length}`}
            dataList={scoreList}
            columns={columns}
            isShowModal={false}
            setIsShowModal={() => {}}
            handleCreateNew={() => {}}
          ></TableList>
        </Col>
      </Row>
    </>
  );
};

export default Result;
