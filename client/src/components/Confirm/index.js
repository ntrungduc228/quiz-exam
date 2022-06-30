import React from 'react';
import { Button, Modal, Row, Col, Spinner } from 'react-bootstrap';

const Confirm = ({ title, data, isShowModalConfirm, setIsShowModalConfirm, handleSubmitForm, isLoading }) => {
  return (
    <>
      <Modal size="" show={isShowModalConfirm} onHide={() => setIsShowModalConfirm(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">{title || 'Bạn có chắn chắn muốn thực hiện thao tác này?'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="font-weight-bold" style={{ color: '#333', fontSize: '16px' }}>
            {data}
          </p>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button className="shadow-3" variant="warning" style={{ width: '120px' }} onClick={() => setIsShowModalConfirm(false)}>
                Hủy
              </Button>
              <Button
                disabled={isLoading}
                className="shadow-3"
                variant="danger"
                style={{ width: !isLoading ? '120px' : '140px' }}
                onClick={() => handleSubmitForm()}
              >
                {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                <span>&nbsp; Xác nhận</span>
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Confirm;
