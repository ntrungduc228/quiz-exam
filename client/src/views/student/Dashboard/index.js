import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import { getAllExamsByClass, setExamInfo, getExamsByStudent } from '../../../store/slices/exam';
import FormResult from '../../student/Result/FormResult';

const Dashboard = () => {
  const [examList, setExamList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [formValue, setFormValue] = useState(null);

  const { exams, examInfo, examByStudent } = useSelector((state) => state.exam);
  const { user } = useSelector((state) => state.auth);
  const { examResult } = useSelector((state) => state.answer);

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

    dispatch(getExamsByStudent({ classId: user.classId, studentId: user.userId }))
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
  console.log('examByStudent', examByStudent);
  console.log('examList', examList);

  useEffect(() => {
    if (examInfo?.classId && examInfo?.subjectId && examInfo?.times && !examResult) {
      history.push('/do-exam');
    }
  }, [examInfo]);

  useEffect(() => {
    setExamList(exams);
  }, [exams]);

  const handleShowResult = (data) => {
    setIsShowModal(true);
    setFormValue({ ...data, result: examByStudent[data.keyField] });
  };

  return (
    <React.Fragment>
      <FormResult data={formValue} setIsShowModal={setIsShowModal} isShowModal={isShowModal} />
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
                  <Button
                    variant={examByStudent[item.keyField] ? 'warning' : 'primary'}
                    className="mt-2"
                    onClick={() => (examByStudent[item.keyField]?.score > -1 ? handleShowResult(item) : dispatch(setExamInfo(item)))}
                  >
                    {examByStudent[item.keyField]
                      ? examByStudent[item.keyField] && examByStudent[item.keyField].score > -1
                        ? 'Xem điểm'
                        : 'Thi tiếp'
                      : 'Vào thi'}
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
