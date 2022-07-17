import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAllSubjects } from '../../../store/slices/subject';
import { getAllClasses } from '../../../store/slices/class';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import { STATE_EXAM } from '../../../config/constant';

const schema = yup
  .object({
    classId: yup.string().required('Vui lòng chọn lớp học'),
    subjectId: yup.string().required('Vui lòng chọn môn học'),
    times: yup.number('Vui lòng nhập số nguyên').required('Vui lòng nhập lần thi').positive().integer(),
    timeExam: yup.number('Vui lòng nhập số nguyên').required('Vui lòng nhập thời gian cho bài thi (phút)').positive().integer(),
    dateExam: yup.string().required('Vui lòng chọn ngày thi'),
    numOfEasy: yup.number('Vui lòng nhập số nguyên').required('Vui lòng nhập số câu dễ').positive().integer(),
    numOfMedium: yup.number('Vui lòng nhập số nguyên').required('Vui lòng nhập số câu trung bình').positive().integer(),
    numOfHard: yup.number('Vui lòng nhập số nguyên').required('Vui lòng nhập số câu khó').positive().integer(),
    state: yup.boolean().required('Vui lòng chọn trạng thái')
  })
  .required();

const ExamForm = ({ title, data, isDetail, isUpdate, isShowModal, setIsShowModal, handleSubmitForm, errorMessage }) => {
  const [subjectList, setSubjectList] = useState([]);
  const [classList, setClassList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const { subjects } = useSelector((state) => state.subject);
  const { classes } = useSelector((state) => state.class);
  const { isLoading } = useSelector((state) => state.exam);
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

    dispatch(getAllClasses())
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
    setSubjectList(subjects);
  }, [subjects]);

  useEffect(() => {
    setClassList(classes);
  }, [classes]);

  useEffect(() => {
    setValue('classId', data.classId);
    setValue('subjectId', data.subjectId);
    setValue('times', data.times);
    setValue('timeExam', data.timeExam);
    setValue('dateExam', data.dateExam);
    setValue('numOfEasy', data.numOfEasy);
    setValue('numOfMedium', data.numOfMedium);
    setValue('numOfHard', data.numOfHard);
    setValue('state', data.state);

    clearErrors();
  }, [data]);

  const onSubmit = (data) => {};

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
          <Modal.Title id="example-modal-sizes-title-lg">{title} bài thi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Lớp</Form.Label>
                  <Form.Control as="select" name="classId" {...register('classId')} disabled={isDetail}>
                    {classList.map((item) => (
                      <option key={item.classId} value={item.classId}>
                        {item.classId}
                      </option>
                    ))}
                  </Form.Control>
                  {errors?.classId && <p className="text-danger form-text">{errors?.classId.message}</p>}
                </Form.Group>
              </Col>
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
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Lần thi</Form.Label>
                  <Form.Control name="times" type="text" placeholder="Lần thi" {...register('times')} disabled={isDetail} />
                  {errors?.times && <p className="text-danger form-text">{errors?.times.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Thời gian thi (phút)</Form.Label>
                  <Form.Control name="timeExam" type="text" placeholder="Thời gian thi" {...register('timeExam')} disabled={isDetail} />
                  {errors?.timeExam && <p className="text-danger form-text">{errors?.timeExam.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ngày thi</Form.Label>

                  <Form.Control name="dateExam" type="text" placeholder="Ngày thi" {...register('dateExam')} disabled={isDetail} />
                  {errors?.dateExam && <p className="text-danger form-text">{errors?.dateExam.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Số câu dễ</Form.Label>
                  <Form.Control name="numOfEasy" type="text" placeholder="Tên" {...register('numOfEasy')} disabled={isDetail} />
                  {errors?.numOfEasy && <p className="text-danger form-text">{errors?.numOfEasy.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Số câu trung bình</Form.Label>

                  <Form.Control
                    name="numOfMedium"
                    type="text"
                    placeholder="Số câu trung bình"
                    {...register('numOfMedium')}
                    disabled={isDetail}
                  />
                  {errors?.numOfMedium && <p className="text-danger form-text">{errors?.numOfMedium.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Số câu khó</Form.Label>
                  <Form.Control name="numOfHard" type="text" placeholder="Số câu khó" {...register('numOfHard')} disabled={isDetail} />
                  {errors?.numOfHard && <p className="text-danger form-text">{errors?.numOfHard.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            {(isDetail || isUpdate) && (
              <Row>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Group>
                      <Form.Control as="select" name="state" {...register('state')} disabled={isDetail}>
                        <option value={STATE_EXAM.open}>Mở</option>
                        <option value={STATE_EXAM.close}>Đóng</option>
                      </Form.Control>
                      {errors?.subjectId && <p className="text-danger form-text">{errors?.subjectId.message}</p>}
                    </Form.Group>
                  </Form.Group>
                </Col>
              </Row>
            )}
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

export default ExamForm;
