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
  }, [dispatch, history]);

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
      text: 'M??n h???c',
      sort: true,
      filter: selectFilter({
        options: subjectList,
        placeholder: 'Ch???n m??n h???c'
      })
    },
    {
      dataField: 'times',
      text: 'L???n thi',
      sort: true
    },
    {
      dataField: 'score',
      text: '??i???m',
      sort: true
    },

    {
      dataField: 'studentId',
      text: 'M?? sinh vi??n',
      sort: true
    },
    {
      dataField: 'fullName',
      text: 'H??? t??n',
      sort: true
    },
    {
      dataField: 'scoreStudentData.studentClassData.classId',
      text: 'L???p',
      sort: true,
      filter: selectFilter({
        options: classList,
        placeholder: 'Ch???n l???p h???c'
      })
    },

    {
      dataField: 'date',
      text: 'Ng??y thi',
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
            title={`Danh s??ch k???t qu???: ${scoreList.length}`}
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
