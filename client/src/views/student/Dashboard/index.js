import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import { getAllExamsByClass, setExamInfo } from '../../../store/slices/exam';

const Dashboard = () => {
  const [examList, setExamList] = useState([]);

  const { exams, isLoading, examInfo } = useSelector((state) => state.exam);
  const { user } = useSelector((state) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExamsByClass({ classId: user.classId }))
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
    if (examInfo?.classId && examInfo?.subjectId && examInfo?.times) {
      history.push('/do-exam');
    }
  }, [examInfo]);

  useEffect(() => {
    setExamList(exams);
  }, [exams]);

  return (
    <React.Fragment>
      <Row>
        {examList.map((item) => {
          return (
            <Col md={4} key={item.keyField}>
              <Card style={{}}>
                <Card.Body>
                  <Card.Title className="font-weight-bold" style={{ color: '#2c3e50' }}>
                    {item?.examSubjectData?.name}
                  </Card.Title>
                  <div className="d-flex justify-content-between">
                    <p>Mã môn học: {item?.subjectId}</p>
                    <p>Lần thi: {item?.times}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Số câu hỏi: {item?.numOfEasy + item?.numOfMedium + item?.numOfHard}</p>
                    <p>Thời gian: {item?.timeExam} phút</p>
                  </div>
                  <Button className="mt-2" onClick={() => dispatch(setExamInfo(item))}>
                    Vao thi
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}{' '}
      </Row>
    </React.Fragment>
  );
};

export default Dashboard;
