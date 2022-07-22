import React, { useEffect } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { STATE_EXAM } from '../../../config/constant';

const schema = yup
  .object({
    classId: yup.string().required('Vui lòng chọn lớp học'),
    subjectId: yup.string().required('Vui lòng chọn môn học'),
    times: yup.number().required('Vui lòng nhập lần thi').positive().typeError('Vui lòng nhập số nguyên').integer(),
    timeExam: yup.number().required('Vui lòng nhập thời gian cho bài thi (phút)').typeError('Vui lòng nhập số nguyên').positive().integer(),
    dateExam: yup.string().required('Vui lòng chọn ngày thi'),
    numOfEasy: yup.number().typeError('Vui lòng nhập số nguyên').required('Vui lòng nhập số câu dễ').positive().integer(),
    numOfMedium: yup.number().typeError('Vui lòng nhập số nguyên').required('Vui lòng nhập số câu trung bình').positive().integer(),
    numOfHard: yup.number().typeError('Vui lòng nhập số nguyên').required('Vui lòng nhập số câu khó').positive().integer(),
    state: yup.boolean().required('Vui lòng chọn trạng thái')
  })
  .required();

const ExamForm = ({ title, data, isDetail, isUpdate, isShowModal, setIsShowModal, handleSubmitForm, errorMessage }) => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  useEffect(() => {
    setValue('classId', data.classId);
    setValue('subjectId', data.subjectId);
    setValue('times', data.times);
    setValue('timeExam', data.timeExam);
    setValue('dateExam', data.dateExam);
    setValue('numOfEasy', data.numOfEasy);
    setValue('numOfMedium', data.numOfMedium);
    setValue('numOfHard', data.numOfHard);
    setValue('state', data.state || (!isDetail && !isUpdate && true));

    clearErrors();
  }, [data, clearErrors, setValue, isDetail, isUpdate]);

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
                  <Form.Control name="classId" {...register('classId')} disabled={isDetail || isUpdate}></Form.Control>
                  {errors?.classId && <p className="text-danger form-text">{errors?.classId.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Môn học</Form.Label>
                  <Form.Group>
                    <Form.Control name="subjectId" {...register('subjectId')} disabled={isDetail || isUpdate}></Form.Control>
                    {errors?.subjectId && <p className="text-danger form-text">{errors?.subjectId.message}</p>}
                  </Form.Group>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Lần thi</Form.Label>
                  <Form.Control name="times" type="text" placeholder="Lần thi" {...register('times')} disabled={isDetail || isUpdate} />
                  {errors?.times && <p className="text-danger form-text">{errors?.times.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Thời gian thi (phút)</Form.Label>
                  <Form.Control
                    name="timeExam"
                    type="text"
                    placeholder="Thời gian thi"
                    {...register('timeExam')}
                    disabled={isDetail || isUpdate}
                  />
                  {errors?.timeExam && <p className="text-danger form-text">{errors?.timeExam.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ngày thi</Form.Label>

                  <Form.Control
                    name="dateExam"
                    type="date"
                    placeholder="Ngày thi"
                    {...register('dateExam')}
                    disabled={isDetail || isUpdate}
                  />
                  {errors?.dateExam && <p className="text-danger form-text">{errors?.dateExam.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Số câu dễ</Form.Label>
                  <Form.Control name="numOfEasy" type="text" placeholder="Tên" {...register('numOfEasy')} disabled={isDetail || isUpdate} />
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
                    disabled={isDetail || isUpdate}
                  />
                  {errors?.numOfMedium && <p className="text-danger form-text">{errors?.numOfMedium.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Số câu khó</Form.Label>
                  <Form.Control
                    name="numOfHard"
                    type="text"
                    placeholder="Số câu khó"
                    {...register('numOfHard')}
                    disabled={isDetail || isUpdate}
                  />
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
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExamForm;
