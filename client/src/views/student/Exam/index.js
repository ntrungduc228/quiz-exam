import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Collapse, Spinner } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import { doingExam, setLoading, getResultByExam, updateStudentAnswer } from '../../../store/slices/answer';
import { setExamInfo } from '../../../store/slices/exam';
import toast from 'react-hot-toast';
import Confirm from '../../../components/Confirm';
import Timer from '../../../components/Timer';

const Exam = () => {
  const [isShowCollapse, setIsShowCollapse] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [questionShow, setQuestionShow] = useState(null);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);

  const { examInfo } = useSelector((state) => state.exam);
  const { examDetail, isLoading } = useSelector((state) => state.answer);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBeforeUnLoad = (e) => {
    e.preventDefault();
    e.returnValue = 'Are you sure you want to close?';
  };

  const handleTabClosing = () => {
    dispatch(getResultByExam({ ...examInfo, studentId: user.userId }));
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
    console.log('examDetail change', examDetail);
    if (examDetail && examDetail?.questionList) {
      setQuestionList(examDetail?.questionList);
      if (!questionShow) {
        changeQuestion(examDetail?.questionList[0]);
      }
    }
  }, [examDetail]);

  const changeQuestion = (data) => {
    setQuestionShow({
      questionId: data.questionId,
      content: data.content,
      studentChoice: data.studentChoice,
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

  // console.log('questionShow', questionShow);
  console.log('questionList', questionList);

  const handleChangeStudentAnswer = (data) => {
    setQuestionShow({ ...questionShow, studentChoice: data.value });
    dispatch(
      updateStudentAnswer({
        subjectId: examInfo.subjectId,
        times: examInfo.times,
        questionId: data.questionId,
        studentId: user.userId,
        answer: data.value
      })
    );
  };

  const handleSubmitExamByStudent = () => {
    history.push('/result');
  };

  const handleShowQuestionNext = () => {
    let index = questionList.findIndex((item) => item.questionId === questionShow.questionId);
    if (index < questionList.length - 1) {
      changeQuestion(questionList[index + 1]);
    }
  };
  const handleShowQuestionPrev = () => {
    let index = questionList.findIndex((item) => item.questionId === questionShow.questionId);
    if (index > 0) {
      changeQuestion(questionList[index - 1]);
    }
  };

  return (
    <React.Fragment>
      <Confirm
        isLoading={isLoading}
        title={`Bạn có chắc chắn muốn nộp bài?`}
        isShowModalConfirm={isShowModalConfirm}
        setIsShowModalConfirm={setIsShowModalConfirm}
        handleSubmitForm={handleSubmitExamByStudent}
        isText={false}
      />
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
                                checked={item.id === questionShow.studentChoice ? true : false}
                                onChange={() => handleChangeStudentAnswer({ questionId: questionShow.questionId, value: item.id })}
                              />
                            ))}
                        </Form.Group>
                      </Form>
                    </PerfectScrollbar>
                  </Card.Body>
                  <Card.Footer>
                    <Col className="mb-4">
                      <h6
                        onClick={() => handleChangeStudentAnswer({ questionId: questionShow.questionId, value: null })}
                        className="font-weight-bold text-danger"
                        style={{ cursor: 'pointer' }}
                      >
                        Xóa câu trả lời
                      </h6>
                    </Col>
                    <div className="d-flex justify-content-between">
                      <Button variant="info" className="text-capitalize" onClick={() => handleShowQuestionPrev()}>
                        <span>
                          <i className="feather icon-arrow-left"></i>
                        </span>
                      </Button>
                      <Button variant="info" className="text-capitalize" onClick={() => handleShowQuestionNext()}>
                        <span>
                          <i className="feather icon-arrow-right"></i>
                        </span>
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={5}>
                <Card>
                  <Card.Header>
                    <div className="d-flex justify-content-between">
                      <div></div>
                      <div>
                        <Timer
                          minutes={examDetail?.info?.timeExam}
                          timeRemain={examDetail?.info?.timeRemain}
                          onComplete={() => handleSubmitExamByStudent()}
                        />
                      </div>
                    </div>
                    <div className="border-top" style={{ marginLeft: '-25px', marginRight: '-25px' }}>
                      <Button className="ml-3 mt-3" onClick={() => setIsShowCollapse(!isShowCollapse)}>
                        {isShowCollapse ? 'Ẩn chi tiết' : 'Hiện chi tiết'}
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
                    <Button variant="danger" className="text-capitalize" onClick={() => setIsShowModalConfirm(true)}>
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
