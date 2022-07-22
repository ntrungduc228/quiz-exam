import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAllSubjects } from '../../../store/slices/subject';
import { ANSWER, LEVEL } from '../../../config/constant';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';

const schema = yup
  .object({
    content: yup.string().required('Vui lòng nhập câu hỏi'),
    answerA: yup.string().required('Vui lòng nhập đáp án A'),
    answerB: yup.string().required('Vui lòng nhập đáp án B'),
    answerC: yup.string().required('Vui lòng nhập đáp án C'),
    answerD: yup.string().required('Vui lòng nhập đáp án D'),
    correctAnswer: yup.string().required('Vui lòng chọn đáp án đúng'),
    level: yup.string().required('Vui lòng chọn trình độ cho câu hỏi'),
    subjectId: yup.string().required('Vui lòng chọn môn học')
  })
  .required();

const QuestionForm = ({ title, data, isDetail, isUpdate, isShowModal, setIsShowModal, handleSubmitForm, errorMessage }) => {
  const [chooseAnswer, setChooseAnswer] = useState('A');
  const [subjectList, setSubjectList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const { subjects } = useSelector((state) => state.subject);
  const { isLoading } = useSelector((state) => state.question);
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
  }, [history, dispatch]);

  useEffect(() => {
    setSubjectList(subjects);
  }, [subjects]);

  useEffect(() => {
    setValue('questionId', data.questionId);
    setValue('content', data.content);
    setValue('answerA', data.answerA);
    setValue('answerB', data.answerB);
    setValue('answerC', data.answerC);
    setValue('answerD', data.answerD);
    setValue('correctAnswer', data.correctAnswer);
    setValue('level', data.level);
    setValue('subjectId', data.subjectId);

    setChooseAnswer(data.correctAnswer);
    clearErrors();
  }, [data, setValue, clearErrors]);

  useEffect(() => {
    setValue('correctAnswer', chooseAnswer);
  }, [chooseAnswer, setValue]);

  const onSubmit = (data) => {
    let questionSubjectData = subjectList.find((item) => item.subjectId === data.subjectId);
    handleSubmitForm({ ...data, questionSubjectData });
  };

  return (
    <>
      <Modal
        size="lg"
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{title} câu hỏi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {(isDetail || isUpdate) && (
              <Row>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Mã câu hỏi</Form.Label>
                    <Form.Control name="questionId" type="text" placeholder="Mã câu hỏi" {...register('questionId')} disabled={true} />
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nội dung</Form.Label>
                  <textarea
                    className="form-control"
                    name="content"
                    id=""
                    placeholder="Nội dung"
                    rows="3"
                    {...register('content')}
                    disabled={isDetail}
                  ></textarea>
                  {errors?.content && <p className="text-danger form-text">{errors?.content.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Đáp án A</Form.Label>
                  <Form.Control name="answerA" type="text" placeholder="Đáp án A" {...register('answerA')} disabled={isDetail} />
                  {errors?.answerA && <p className="text-danger form-text">{errors?.answerA.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Đáp án B</Form.Label>
                  <Form.Control name="answerB" type="text" placeholder="Đáp án B" {...register('answerB')} disabled={isDetail} />
                  {errors?.answerB && <p className="text-danger form-text">{errors?.answerB.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Đáp án C</Form.Label>
                  <Form.Control name="answerC" type="text" placeholder="Đáp án C" {...register('answerC')} disabled={isDetail} />
                  {errors?.answerC && <p className="text-danger form-text">{errors?.answerC.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Đáp án D</Form.Label>
                  <Form.Control name="answerD" type="text" placeholder="Đáp án D" {...register('answerD')} disabled={isDetail} />
                  {errors?.answerD && <p className="text-danger form-text">{errors?.answerD.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Đáp án đúng</Form.Label>
                  <Form.Group>
                    {ANSWER.map((item) => (
                      <Form.Check
                        key={item.value}
                        inline
                        checked={item.value === chooseAnswer}
                        custom
                        type="radio"
                        label={item.value}
                        name="correctAnswer"
                        id={item.value}
                        required
                        value={item.value}
                        disabled={isDetail}
                        onChange={() => setChooseAnswer(item.value)}
                      />
                    ))}

                    {errors?.correctAnswer && <p className="text-danger form-text">{errors?.correctAnswer.message}</p>}
                  </Form.Group>
                </Form.Group>
              </Col>
              <Col md={6}></Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Môn học</Form.Label>
                  <Form.Group>
                    <Form.Control as="select" name="subjectId" {...register('subjectId')} disabled={isDetail}>
                      {subjectList.map((item) => (
                        <option key={item.subjectId} value={item.subjectId}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control>
                    {errors?.subjectId && <p className="text-danger form-text">{errors?.subjectId.message}</p>}
                  </Form.Group>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Trình độ</Form.Label>
                  <Form.Control as="select" name="level" {...register('level')} disabled={isDetail}>
                    {Object.keys(LEVEL).map((item) => (
                      <option key={LEVEL[item].id} value={LEVEL[item].id}>
                        {LEVEL[item].message}
                      </option>
                    ))}
                  </Form.Control>
                  {errors?.level && <p className="text-danger form-text">{errors?.level.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 10, offset: 4 }}>
                {errorMessage && <p className="text-danger form-text">{errorMessage}</p>}
                {!isDetail && (
                  <Button onClick={handleSubmit(onSubmit)} disabled={isDetail || isLoading} color="info">
                    {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                    <span>&nbsp; Lưu</span>
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default QuestionForm;
