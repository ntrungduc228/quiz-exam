import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

import FormSignIn from './FormSignIn';

const SignIn2 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <h4 className="mb-4 text-center">React Datta Able</h4>

              <div className="mb-4 text-center">
                <i className="feather icon-unlock auth-icon" />
              </div>

              <FormSignIn />

              <div className="d-flex justify-content-end">
                <p className="mb-0 text-muted">
                  <NavLink to="/auth/signup" className="f-w-400">
                    Quên mật khẩu?
                  </NavLink>
                </p>
              </div>

              <br />

              <p className="mb-0 text-muted">
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

export default SignIn2;
