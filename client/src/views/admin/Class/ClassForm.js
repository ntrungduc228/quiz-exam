import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    classId: yup.string().required('Vui lòng nhập mã lớp'),
    name: yup.string().required('Vui lòng nhập tên lớp')
  })
  .required();

const ClassForm = ({ title, data, isShowModal, setIsShowModal, handleSubmitForm, errorMessage }) => {
  const [formValue, setFormValue] = useState(data);

  const { isLoading } = useSelector((state) => state.class);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  // console.log('err validate', errors);
  const onSubmit = (data) => {
    handleSubmitForm(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    setValue('classId', data.classId);
    setValue('name', data.name);
    clearErrors();
  }, [data, clearErrors, setValue]);
  // console.log('form state', formValue);

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
          <Modal.Title id="example-modal-sizes-title-lg">{title} lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalClassId">
              <Form.Label column sm={3}>
                Mã lớp
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  name="classId"
                  type="text"
                  placeholder="Mã lớp"
                  // value={formValue?.classId || ''}
                  // onChange={handleChange}
                  {...register('classId')}
                />
                {errors?.classId && <p className="text-danger form-text">{errors?.classId.message}</p>}
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={3}>
                Tên lớp
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  name="name"
                  type="text"
                  // value={formValue?.name || ''}
                  placeholder="Tên lớp"
                  onChange={handleChange}
                  {...register('name')}
                />
                {errors?.name && <p className="text-danger form-text">{errors?.name.message}</p>}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 4 }}>
                {errorMessage && <p className="text-danger form-text">{errorMessage}</p>}

                <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} color="info">
                  {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                  <span>&nbsp; Lưu</span>
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClassForm;
