import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { verifyResetAccount, setLoading, logout } from '../../../store/slices/auth';
import errorJwt from '../../../utils/errorJwt';
import { useHistory } from 'react-router-dom';
import { STATE } from '../../../config/constant';

const schema = yup
  .object({
    password: yup.string().min(6, 'Mật khẩu tối thiểu 6 kí tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không trùng')
  })
  .required();

const FormVerify = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({ mode: 'onSubmit', resolver: yupResolver(schema) });

  useEffect(() => {
    clearErrors();
  }, []);

  useEffect(() => {
    if (user?.state !== STATE.needConfirm) {
      history.push('/');
    }
  }, [user]);

  const onSubmit = (data) => {
    dispatch(setLoading(true));
    dispatch(verifyResetAccount({ username: user.userId, password: data.password }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          history.push('/');
        }
      })
      .catch((err) => {
        console.log('wrap err', err);
        if (errorJwt(err)) {
          dispatch(logout());
        }
        setErrorMessage(err?.message);
      });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Nhập mật khẩu mới</Form.Label>
            <Form.Control type="password" name="password" {...register('password')} />
            {errors?.password && <p className="text-danger form-text">{errors?.password.message}</p>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
            <Form.Control type="password" name="confirmPassword" {...register('confirmPassword')} />
            {errors?.confirmPassword && <p className="text-danger form-text">{errors?.confirmPassword.message}</p>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          {errorMessage && <p className="text-danger form-text">{errorMessage}</p>}
          <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} color="info" size="large" className="btn-block">
            {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
            <span>&nbsp; Lưu</span>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormVerify;
