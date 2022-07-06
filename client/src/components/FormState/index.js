import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Confirm from '../Confirm';
import { STATE } from '../../config/constant';

const stateLabel = {
  active: 'Hoạt động',
  needConfirm: 'Chờ xác nhận',
  lock: 'Bị khóa'
};

const FormState = ({ data, isLoading, title, isShowModalConfirm, setIsShowModalConfirm, handleSubmitForm }) => {
  const [chooseState, setChooseState] = useState(0);

  useEffect(() => {
    setChooseState(data?.studentAccountData?.state);
  }, [data]);

  const handleSubmitChangeState = () => {
    handleSubmitForm({ username: data?.studentId, state: chooseState });
  };

  let content = (
    <Form>
      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={3}>
          Trạng thái
        </Form.Label>
        <Col sm={9}>
          {Object.keys(STATE).map((key) => (
            <Form.Check
              type="radio"
              key={key}
              checked={chooseState === STATE[key] ? true : false}
              label={stateLabel[key]}
              name="state"
              id={key}
              onChange={() => setChooseState(STATE[key])}
            />
          ))}
        </Col>
      </Form.Group>
    </Form>
  );

  return (
    <Confirm
      isLoading={isLoading}
      title={title}
      data={content}
      isShowModalConfirm={isShowModalConfirm}
      setIsShowModalConfirm={setIsShowModalConfirm}
      handleSubmitForm={handleSubmitChangeState}
      isText={true}
    />
  );
};

export default FormState;
