import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAllClasses } from '../../../store/slices/class';

const schema = yup
  .object({
    studentId: yup.string().required('Vui lòng mã sinh viên'),
    lastName: yup.string().required('Vui lòng nhập họ'),
    firstName: yup.string().required('Vui lòng nhập tên'),
    gender: yup.string().required('Vui lòng chọn giới tính'),
    phone: yup.string('Vui lòng nhập số điện thoại hợp lệ').required('Vui lòng nhập số điện thoại'),
    email: yup.string().email('Vui lòng nhập đúng email').required('Vui lòng nhập email'),
    classId: yup.string().required('Vui lòng nhập mã lớp'),
    birthday: yup.string().required('Vui lòng nhập ngày sinh')
  })
  .required();

const StudentForm = ({ title, data, isDetail, isUpdate, isShowModal, setIsShowModal, handleSubmitForm, errorMessage }) => {
  const [classList, setClassList] = useState([]);
  const [chooseGender, setChooseGender] = useState(data?.gender);

  const { isLoading } = useSelector((state) => state.student);
  const { classes } = useSelector((state) => state.class);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  useEffect(() => {
    if (classes.length === 0) {
      dispatch(getAllClasses())
        .unwrap()
        .then(() => {})
        .catch(async (err) => {});
    }
  }, []);

  useEffect(() => {
    setClassList(classes);
  }, [classes]);

  useEffect(() => {
    setValue('classId', data.classId);
    setValue('studentId', data.studentId);
    setValue('lastName', data.lastName);
    setValue('firstName', data.firstName);
    setValue('gender', data.gender);
    setValue('phone', data.phone);
    setValue('email', data?.studentAccountData?.email || data?.email);
    setValue('birthday', data.birthday);

    setChooseGender(data?.gender);

    clearErrors();
  }, [data]);

  const onSubmit = (data) => {
    handleSubmitForm({ ...data, gender: chooseGender });
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
          <Modal.Title id="example-modal-sizes-title-lg">{title} sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mã sinh viên</Form.Label>
                  <Form.Control
                    name="studentId"
                    type="text"
                    placeholder="Mã sinh viên"
                    {...register('studentId')}
                    disabled={isDetail || isUpdate}
                  />
                  {errors?.studentId && <p className="text-danger form-text">{errors?.studentId.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" placeholder="Email" {...register('email')} disabled={isDetail || isUpdate} />
                  {errors?.email && <p className="text-danger form-text">{errors?.email.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Họ</Form.Label>
                  <Form.Control name="lastName" type="text" placeholder="Họ" {...register('lastName')} disabled={isDetail} />
                  {errors?.lastName && <p className="text-danger form-text">{errors?.lastName.message}</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tên</Form.Label>
                  <Form.Control name="firstName" type="text" placeholder="Tên" {...register('firstName')} disabled={isDetail} />
                  {errors?.firstName && <p className="text-danger form-text">{errors?.firstName.message}</p>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phái</Form.Label>
                  <Form.Group>
                    <Form.Check
                      inline
                      checked={chooseGender ? true : false}
                      custom
                      type="radio"
                      label="Nam"
                      name="gender"
                      id="male"
                      required
                      value={true}
                      // {...register('gender')}
                      disabled={isDetail}
                      onChange={() => setChooseGender(true)}
                    />
                    <Form.Check
                      inline
                      checked={!chooseGender ? true : false}
                      custom
                      type="radio"
                      label="Nữ"
                      name="gender"
                      id="female"
                      required
                      value={false}
                      disabled={isDetail}
                      onChange={() => setChooseGender(false)}
                      // {...register('gender')}
                    />
                    {errors?.gender && <p className="text-danger form-text">{errors?.gender.message}</p>}
                  </Form.Group>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control name="birthday" type="date" placeholder="Ngày sinh" {...register('birthday')} disabled={isDetail} />
                  {errors?.birthday && <p className="text-danger form-text">{errors?.birthday.message}</p>}
                </Form.Group>
              </Col>
            </Row>

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
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control disabled={isDetail} name="phone" type="text" placeholder="Số điện thoại" {...register('phone')} />
                  {errors?.phone && <p className="text-danger form-text">{errors?.phone.message}</p>}
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

export default StudentForm;
