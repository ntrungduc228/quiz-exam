import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/auth';

const Page403 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const handleLogOut = async () => {
    await dispatch(logout());
    history.push('/signin');
  };

  return (
    <React.Fragment>
      <div className="mt-5">
        <div className="text-center">
          <h1 style={{ fontSize: '11rem' }}>403</h1>
          <p style={{ color: '#333', fontSize: '2rem' }}>
            <strong>Oop!</strong> Có gì đó sai sai
          </p>
          <Button variant="primary">
            <Link to="/" style={{ color: '#fff' }}>
              Trang chủ
            </Link>
          </Button>
          {user && (
            <div className="mt-4">
              <Button variant="danger" onClick={handleLogOut}>
                Đăng xuất
              </Button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page403;
