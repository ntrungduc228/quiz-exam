import React from 'react';
import { Card } from 'react-bootstrap';
import FormForgetPassword from './FormForgetPassword';
import { NavLink } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless ">
            <Card.Body>
              <h4 className="mb-4 text-center">Quên mật khẩu</h4>

              <div className="mb-4 text-center">
                <i className="feather icon-unlock auth-icon" />
              </div>

              <FormForgetPassword />

              <div className="d-flex justify-content-end">
                <p className="mb-0 text-muted">
                  <NavLink to="/signin" className="f-w-400">
                    Đăng nhập
                  </NavLink>
                </p>
              </div>

              <br />

              <p className="mb-0 text-muted text-center">
                &copy;{' '}
                <a target="_blank" href="https://codedthemes.com/" rel="noreferrer">
                  ntrungduc - 2022
                </a>
                .
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgetPassword;
