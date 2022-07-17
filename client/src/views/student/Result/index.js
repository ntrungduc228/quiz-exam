import React, { useEffect } from 'react';
import { Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getResultByExam, setLoading } from '../../../store/slices/answer';
import { setExamInfo } from '../../../store/slices/exam';

const Result = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, examResult } = useSelector((state) => state.answer);
  const { examInfo } = useSelector((state) => state.exam);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!examInfo?.classId && !examInfo?.subjectId && !examInfo?.times) {
      history.push('/dashboard');
    }
    console.log('examInfo', examInfo);
    if (examInfo?.classId && examInfo?.subjectId && examInfo?.times) {
      dispatch(setLoading(true));
      dispatch(getResultByExam({ studentId: user.userId, subjectId: examInfo.subjectId, times: examInfo.times }));
    }
  }, [examInfo]);

  const handleGoHomePage = () => {
    dispatch(setExamInfo(null));
    history.push('/dashboard');
  };

  console.log('examResult', examResult);

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ flex: 1, height: '100vh' }}>
          <Spinner animation="border" role="status" variant="info" style={{ width: '3rem', height: '3rem' }} />
        </div>
      ) : (
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title id="example-modal-sizes-title-lg">Kết quả bài thi môn {examResult?.examSubjectData?.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mx-auto">
                    <div className="d-flex justify-content-between">
                      <p>Mã môn học: {examResult?.examSubjectData?.subjectId}</p>
                      <p>Lần thi: {examResult?.times}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Số câu hỏi: {examResult?.numOfEasy + examResult?.numOfMedium + examResult?.numOfHard}</p>
                      <p>Thời gian: {examResult?.timeExam}</p>
                    </div>
                    <div>
                      <p>Tên thí sinh: {user.lastName + ' ' + user.firstName}</p>
                      <p>Mã thí sinh: {user.userId}</p>
                      <p>Mã lớp: {examResult?.classId}</p>
                    </div>
                    <div>
                      <p className="text-center" style={{ color: '#333', fontWeight: 600 }}>
                        Điểm thi: {examResult?.result?.score}/10
                      </p>
                    </div>
                  </Col>

                  <Col sm={{ span: 10, offset: 5 }} className="mt-4">
                    <Button onClick={() => handleGoHomePage()} variant="danger">
                      <span>&nbsp; Về trang chủ</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Result;
