import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const TeacherForm = ({ title, data, isDetail, isUpdate, isShowModal, setIsShowModal, handleSubmitForm, errorMessage }) => {
  return <div>TeacherForm</div>;
};

export default TeacherForm;
