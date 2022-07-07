import React from 'react';
import { Toast } from 'react-bootstrap';

const types = {
  success: {
    type: 'success',
    icon: 'feather icon-check-circle mr-2 text-success'
  },
  error: {
    type: 'error',
    icon: 'feather icon-x-circle mr-2 text-danger'
  },
  warning: {
    type: 'warning',
    icon: 'feather icon-alert-circle mr-2 text-warning'
  },
  info: { type: 'info', icon: 'feather icon-info mr-2 text-info' }
};

const Toasts = ({ type, show, setShow, message }) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '10px'
        }}
      >
        <Toast
          onClose={() => setShow(false)}
          onClick={() => setShow(false)}
          show={show}
          delay={5000}
          autohide
          style={{ cursor: 'pointer' }}
        >
          <Toast.Body>
            <div>
              <i className={types.info.icon} style={{ fontSize: '20px' }} />
              {message}
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default Toasts;
