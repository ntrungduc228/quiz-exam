import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <React.Fragment>
      <div className="mt-5">
        <div className="text-center">
          <h1 style={{ fontSize: '11rem' }}>404</h1>
          <p style={{ color: '#333', fontSize: '2rem' }}>Page not found</p>
          <Button variant="primary">
            <Link to="/" style={{ color: '#fff' }}>
              Trang chủ
            </Link>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page404;
