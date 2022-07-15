import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Collapse, Spinner } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import { doingExam, setLoading } from '../../../store/slices/answer';
import { setExamInfo } from '../../../store/slices/exam';
import toast from 'react-hot-toast';

const Exam = () => {
  const [isShowCollapse, setIsShowCollapse] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [questionShow, setQuestionShow] = useState(null);

  const { examInfo } = useSelector((state) => state.exam);
  const { examDetail, isLoading, answers } = useSelector((state) => state.answer);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBeforeUnLoad = (e) => {
    e.preventDefault();
    e.returnValue = 'Are you sure you want to close?';
  };

  const handleTabClosing = () => {
    alert('closeing');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnLoad);
    window.addEventListener('unload', handleTabClosing);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnLoad);
      window.removeEventListener('unload', handleTabClosing);
    };
  }, []);

  useEffect(() => {
    if (!examDetail) {
      dispatch(setLoading(true));
      if (examInfo?.classId && examInfo?.subjectId && examInfo?.times) {
        dispatch(
          doingExam({
            classId: examInfo.classId,
            subjectId: examInfo.subjectId,
            times: examInfo.times,
            studentId: user.userId
          })
        )
          .unwrap()
          .then(() => {})
          .catch(async (err) => {
            console.log(err);
            if (errorJwt(err)) {
              await dispatch(logout());
              history.push('/signin');
            } else {
              toast.error(err.message);
              dispatch(setExamInfo(null));
            }
          });
      } else {
        history.push('/dashboard');
      }
    }
  }, [examInfo]);

  useEffect(() => {
    if (examDetail && examDetail?.questionList) {
      setQuestionList(examDetail?.questionList);
      setQuestionShow({
        questionId: examDetail?.questionList[0].questionId,
        content: examDetail?.questionList[0].content,
        answer: [
          {
            id: 'A',
            value: examDetail?.questionList[0].answerA,
            name: examDetail?.questionList[0].questionId
          },
          {
            id: 'B',
            value: examDetail?.questionList[0].answerB,
            name: examDetail?.questionList[0].questionId
          },
          {
            id: 'C',
            value: examDetail?.questionList[0].answerC,
            name: examDetail?.questionList[0].questionId
          },
          {
            id: 'D',
            value: examDetail?.questionList[0].answerD,
            name: examDetail?.questionList[0].questionId
          }
        ]
      });
    }
  }, [examDetail]);

  const changeQuestion = (data) => {
    setQuestionShow({
      questionId: data.questionId,
      content: data.content,
      answer: [
        {
          id: 'A',
          value: data.answerA,
          name: data.questionId
        },
        {
          id: 'B',
          value: data.answerB,
          name: data.questionId
        },
        {
          id: 'C',
          value: data.answerC,
          name: data.questionId
        },
        {
          id: 'D',
          value: data.answerD,
          name: data.questionId
        }
      ]
    });
  };

  console.log('questionShow', questionShow);

  let arr = [];
  for (let i = 0; i < 60; i++) {
    arr.push(i);
  }
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ flex: 1, height: '100vh' }}>
          <Spinner animation="border" role="status" variant="info" style={{ width: '3rem', height: '3rem' }} />
        </div>
      ) : (
        <>
          {questionShow ? (
            <Row>
              <Col md={7}>
                <Card>
                  <Card.Header>
                    <h4 style={{}}>{questionShow.content}</h4>
                  </Card.Header>
                  <Card.Body>
                    <PerfectScrollbar>
                      <Form style={{ marginLeft: '10px' }}>
                        <Form.Group>
                          {questionShow &&
                            questionShow?.answer?.map((item) => (
                              <Form.Check
                                key={item.id}
                                className="mb-3"
                                custom
                                type="radio"
                                label={item.value}
                                name={item.name}
                                id={item.id}
                              />
                            ))}
                        </Form.Group>
                      </Form>
                    </PerfectScrollbar>
                  </Card.Body>
                  <Card.Footer>
                    <Col className="mb-4">
                      <h6 onClick={() => alert('click h6')} className="font-weight-bold text-danger" style={{ cursor: 'pointer' }}>
                        Xóa câu trả lời
                      </h6>
                    </Col>
                    <div className="d-flex justify-content-between">
                      <Button variant="info" className="text-capitalize">
                        info
                      </Button>{' '}
                      <Button variant="info" className="text-capitalize">
                        info
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={5}>
                <Card>
                  <Card.Header>
                    Featured
                    <div className="border-top" style={{ marginLeft: '-25px', marginRight: '-25px' }}>
                      <Button className="ml-3 mt-3" onClick={() => setIsShowCollapse(!isShowCollapse)}>
                        Hiện chi tiết Ẩn
                      </Button>
                    </div>
                  </Card.Header>
                  <Collapse in={isShowCollapse}>
                    <div id="basic-collapse">
                      <Card.Body>
                        <PerfectScrollbar>
                          <div style={{ height: '250px' }}>
                            <Row>
                              <Col className="d-flex flex-wrap">
                                {questionList.map((item, index) => {
                                  return (
                                    <Button
                                      variant={item.questionId === questionShow.questionId ? 'info' : 'light'}
                                      className="text-capitalize"
                                      key={item.questionId}
                                      style={{ width: '70px' }}
                                      onClick={() => changeQuestion(item)}
                                    >
                                      {index + 1}
                                    </Button>
                                  );
                                })}
                              </Col>
                            </Row>
                          </div>
                        </PerfectScrollbar>
                      </Card.Body>
                    </div>
                  </Collapse>

                  <Card.Footer>
                    <Button variant="danger" className="text-capitalize">
                      <span>Nộp bài</span>
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          ) : (
            <span>Đã xảy ra lỗi</span>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Exam;
