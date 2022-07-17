import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const FormResult = ({ data, isShowModal, setIsShowModal }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Modal
        size="lg"
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Kết quả bài thi môn {data?.examSubjectData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} className="mx-auto">
              <div className="d-flex justify-content-between">
                <p>Mã môn học: {data?.examSubjectData?.subjectId}</p>
                <p>Lần thi: {data?.times}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Số câu hỏi: {data?.numOfEasy + data?.numOfMedium + data?.numOfHard}</p>
                <p>Thời gian: {data?.timeExam}</p>
              </div>
              <div>
                <p>Tên thí sinh: {user.lastName + ' ' + user.firstName}</p>
                <p>Mã thí sinh: {user.userId}</p>
                <p>Mã lớp: {data?.classId}</p>
              </div>
              <div>
                <p className="text-center" style={{ color: '#333', fontWeight: 600 }}>
                  Điểm thi: {data?.result?.score}/10
                </p>
              </div>
            </Col>

            <Col sm={{ span: 10, offset: 5 }} className="mt-4">
              <Button onClick={() => setIsShowModal(false)} variant="danger">
                <span>&nbsp; Đóng</span>
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormResult;
