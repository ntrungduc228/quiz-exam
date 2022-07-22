import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { selectAuth, setLoading, login } from '../../../store/slices/auth';
import { clearMessage } from '../../../store/slices/message';

import { BASE_URL } from '../../../config/constant';

const FormSignIn = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector(selectAuth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (isLoggedIn) {
    return <Redirect to={BASE_URL} />;
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Vui lòng nhập username'),
          password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
        })}
        onSubmit={async (values, { isSubmitting, setFieldValue, setErrors, setStatus, setSubmitting }) => {
          dispatch(setLoading(true));
          dispatch(login(values));
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => {
          return (
            <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  error={touched.username && errors.username}
                  label="Username"
                  placeholder="Username"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                />
                {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
              </div>
              <div className="form-group mb-4">
                <input
                  className="form-control"
                  error={touched.password && errors.password}
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                />
                {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
              </div>

              {errors.submit && (
                <Col sm={12}>
                  <Alert variant="danger">{errors.submit}</Alert>
                </Col>
              )}

              {message && (
                <Col sm={12}>
                  <p className="text-danger">{message}</p>
                </Col>
              )}

              {/* <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Save credentials.
                </label>
              </div> */}
              <Row>
                <Col mt={2}>
                  <Button className="btn-block" color="primary" disabled={isLoading} size="large" type="submit" variant="primary">
                    {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                    <span>&nbsp;Đăng nhập</span>
                  </Button>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
      <hr />
    </React.Fragment>
  );
};

export default FormSignIn;
