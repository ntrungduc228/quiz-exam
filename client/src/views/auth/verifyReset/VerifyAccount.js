import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/auth';
import { useHistory } from 'react-router-dom';
import FormVerify from './FormVerify';

const VerifyAccount = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

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
              <h4 className="mb-4 text-center">Đổi mật khẩu</h4>

              <div className="mb-4 text-center">
                <i className="feather icon-unlock auth-icon" />
              </div>

              <FormVerify />

              <div className="mt-4 text-center">
                <p className="mb-0 f-w-600" style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                  Đăng xuất
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

export default VerifyAccount;
