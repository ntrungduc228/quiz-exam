import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { forgetPassword, setLoading } from '../../../store/slices/auth';

const schema = yup
  .object({
    email: yup.string().email('Vui lòng nhập đúng email').required('Vui lòng nhập email')
  })
  .required();

const FormForgetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const onSubmit = (data) => {
    dispatch(setLoading(true));
    dispatch(forgetPassword({ email: data.email }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          setValue('email', '');
          setErrorMessage(res?.message);
        }
      })
      .catch(async (err) => {
        console.log('wrap err', err);
        setErrorMessage(err?.message);
      });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Nhập email</Form.Label>
            <Form.Control type="email" name="email" {...register('email')} />
            {errors?.email && <p className="text-danger form-text">{errors?.email.message}</p>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          {errorMessage && <p className="text-danger form-text">{errorMessage}</p>}
          <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} color="info" size="large" className="btn-block">
            {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
            <span>&nbsp; Xác nhận</span>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormForgetPassword;
