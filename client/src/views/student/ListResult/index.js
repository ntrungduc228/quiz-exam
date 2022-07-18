import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getListResultByStudentId } from '../../../store/slices/score';

const ListResult = () => {
  const [scoreList, setScoreList] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { scores } = useSelector((state) => state.score);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListResultByStudentId({ studentId: user.userId }))
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log(err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });
  }, []);

  useEffect(() => {
    setScoreList(scores);
  }, [scores]);

  // console.log('score', scoreList);

  const columns = [
    {
      dataField: 'scoreSubjectData.name',
      text: 'Môn học',
      sort: true
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

export default ListResult;
