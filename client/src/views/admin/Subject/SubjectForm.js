import React, { useEffect } from 'react';
import { Row, Col, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    subjectId: yup.string().required('Vui lòng nhập mã môn học'),
    name: yup.string().required('Vui lòng nhập tên môn học')
  })
  .required();

const SubjectForm = ({ title, data, isDetail, isUpdate, isShowModal, setIsShowModal, handleSubmitForm, errorMessage }) => {
  const { isLoading } = useSelector((state) => state.subject);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  useEffect(() => {
    setValue('subjectId', data.subjectId);
    setValue('name', data.name);

    clearErrors();
  }, [data, setValue, clearErrors]);

  const onSubmit = (data) => {
    handleSubmitForm(data);
  };

  return (
    <>
      <Modal
        size=""
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{title} môn học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Mã môn học</Form.Label>
                  <Form.Control name="subjectId" type="text" placeholder="Tên" {...register('subjectId')} disabled={isDetail} />
                  {errors?.subjectId && <p className="text-danger form-text">{errors?.subjectId.message}</p>}
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Tên môn học</Form.Label>
                  <Form.Control name="name" type="text" placeholder="Tên" {...register('name')} disabled={isDetail} />
                  {errors?.name && <p className="text-danger form-text">{errors?.name.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 6, offset: 4 }}>
                {errorMessage && <p className="text-danger form-text">{errorMessage}</p>}
                {!isDetail && (
                  <Button onClick={handleSubmit(onSubmit)} disabled={isDetail || isLoading} color="info">
                    {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                    <span>&nbsp; Lưu</span>
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubjectForm;
