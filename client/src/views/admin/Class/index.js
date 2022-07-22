import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllClasses, createNewClass, setLoading, updateClassById, deleteClassById } from '../../../store/slices/class';
import { clearMessage } from '../../../store/slices/message';
import TableList from '../../../components/TableList';
import ClassForm from './ClassForm';
import { ACTION_TYPE } from '../../../config/constant';
import errorJwt from '../../../utils/errorJwt';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/slices/auth';
import Confirm from '../../../components/Confirm';
import toast from 'react-hot-toast';

const Class = () => {
  const initialValues = useRef({ classId: '', name: '' }).current;
  const [formValue, setFormValue] = useState(initialValues);
  const [classList, setClassList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.CREATE);
  const [errorMessage, setErrorMessage] = useState('');

  const { classes, isLoading } = useSelector((state) => state.class);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllClasses())
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log('yeye', err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });
  }, []);

  useEffect(() => {
    setClassList(classes);
  }, [classes]);

  const handleCreateNew = () => {
    setFormValue(initialValues);
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.CREATE);
    setErrorMessage('');
  };

  const handleUpdateClass = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.UPDATE);
    setErrorMessage('');
  };

  const handleDeleteClass = (data) => {
    setFormValue({ ...data });
    setIsShowModalConfirm(true);
  };

  const handleSubmitCreateClass = async (data) => {
    await dispatch(setLoading(true));

    dispatch(createNewClass(data))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setFormValue({ ...initialValues });
          setIsShowModal(false);
        }
      })
      .catch(async (err) => {
        console.log('wrap err', err);
        if (errorJwt(err)) {
          await dispatch(logout());
          await history.push('/signin');
        }
        setErrorMessage(err?.message);
      });
  };

  const handleSubmitUpdateClass = async (data) => {
    await dispatch(setLoading(true));

    dispatch(updateClassById({ ...formValue, newData: { ...data } }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setFormValue({ ...initialValues });
          setIsShowModal(false);
        }
      })
      .catch(async (err) => {
        console.log('wrap err', err);
        if (errorJwt(err)) {
          await dispatch(logout());
          await history.push('/signin');
        }
        setErrorMessage(err?.message);
      });
  };

  const handleSubmitDeleteClass = async () => {
    await dispatch(setLoading(true));

    dispatch(deleteClassById({ classId: formValue?.classId }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setFormValue({ ...initialValues });
          setIsShowModalConfirm(false);
        }
      })
      .catch(async (err) => {
        setIsShowModalConfirm(false);
        console.log('wrap err', err);
        if (errorJwt(err)) {
          await dispatch(logout());
          await history.push('/signin');
        }
        toast.error(err?.message);
      });
  };

  const columns = [
    {
      dataField: 'classId',
      text: 'Mã lớp',
      sort: true
    },
    {
      dataField: 'name',
      text: 'Tên lớp',
      sort: true
    },
    {
      dataField: '',
      text: 'Thao tác',
      // isDummyField: true,
      sort: false,
      formatter: (cellContent, row, rowIndex) => {
        let disabled = row?.studentClassData?.length > 0 ? true : false;
        return (
          <>
            <Button disabled={disabled} variant="warning" className="btn-icon" key={rowIndex} onClick={() => handleUpdateClass(row)}>
              <i className="feather icon-edit" />
            </Button>
            <Button
              disabled={disabled}
              variant="danger"
              className="btn-icon"
              key={(rowIndex + 1) * classes.length}
              onClick={() => handleDeleteClass(row)}
            >
              <i className="feather icon-trash" />
            </Button>
          </>
        );
      }
    }
  ];

  return (
    <>
      <Confirm
        isLoading={isLoading}
        title={`Bạn có chắc chắn muốn xóa lớp học này?`}
        data={`Mã lớp: ${formValue.classId}`}
        isShowModalConfirm={isShowModalConfirm}
        setIsShowModalConfirm={setIsShowModalConfirm}
        handleSubmitForm={handleSubmitDeleteClass}
        isText={false}
      />

      <ClassForm
        // title={typeAction === ACTION_TYPE.CREATE ? 'Thêm mới' : 'Sửa'}
        title={typeAction.message}
        isDetail={typeAction.type === ACTION_TYPE.DETAIL.type ? true : false}
        data={formValue}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        handleSubmitForm={typeAction.type === ACTION_TYPE.CREATE.type ? handleSubmitCreateClass : handleSubmitUpdateClass}
        errorMessage={errorMessage}
      />

      <TableList
        isShowButtonCreate={true}
        keyField="classId"
        title={`Danh sách lớp học: ${classList.length}`}
        dataList={classList}
        columns={columns}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        handleCreateNew={handleCreateNew}
      ></TableList>
    </>
  );
};

export default Class;
