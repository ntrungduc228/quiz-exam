import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Card, Tabs, Tab, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { ROLES } from '../../config/constant';

const schema = yup
  .object({
    password: yup.string().min(6, 'Mật khẩu tối thiểu 6 kí tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không trùng')
  })
  .required();

const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [linkTo, setLinkTo] = useState('');

  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  useEffect(() => {
    if (user?.role === ROLES.admin) {
      setLinkTo('/admin/profile');
    } else if (user?.role === ROLES.teacher) {
      setLinkTo('/teacher/profile');
    } else if (user?.role === ROLES.student) {
      setLinkTo('/profile');
    }
  }, [user]);

  const onSubmit = (data) => {};

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thông tin cá nhân</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <Link to={linkTo}>Thông tin cá nhân</Link>
                  <Button className="shadow-3 ml-4">Đổi mật khẩu</Button>
                </Col>
              </Row>
              <Form>
                <Row className="d-flex justify-content-center">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Nhập mật khẩu mới</Form.Label>
                      <Form.Control type="password" name="password" {...register('password')} />
                      {errors?.password && <p className="text-danger form-text">{errors?.password.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Nhập mật khẩu mới</Form.Label>
                      <Form.Control type="password" name="password" {...register('password')} />
                      {errors?.password && <p className="text-danger form-text">{errors?.password.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Nhập mật khẩu mới</Form.Label>
                      <Form.Control type="password" name="password" {...register('password')} />
                      {errors?.password && <p className="text-danger form-text">{errors?.password.message}</p>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4" sm={{ span: 10, offset: 5 }}>
                    {errorMessage && <p className=" text-danger form-text">{errorMessage}</p>}
                    <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} color="info" className="shadow-3 btn">
                      {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                      <span>&nbsp; Lưu</span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ChangePassword;
