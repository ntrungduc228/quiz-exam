import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getAllSubjects, setLoading, createNewSubject, deleteSubjectById } from '../../../store/slices/subject';
import { ACTION_TYPE } from '../../../config/constant';
import SubjectForm from './SubjectForm';
import toast from 'react-hot-toast';
import Confirm from '../../../components/Confirm';

const Subject = () => {
  const initialValues = useRef({
    subjectId: '',
    name: ''
  }).current;
  const [formValue, setFormValue] = useState(initialValues);
  const [subjectList, setSubjectList] = useState([]);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.CREATE);
  const [errorMessage, setErrorMessage] = useState('');

  const { subjects, isLoading } = useSelector((state) => state.subject);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects())
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log(err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });
  }, [dispatch, history]);

  useEffect(() => {
    setSubjectList(subjects);
  }, [subjects]);

  const handleCreateNew = () => {
    setFormValue({ ...initialValues });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.CREATE);
    setErrorMessage('');
  };

  const handleDeleteSubject = (data) => {
    setFormValue({ ...data });
    setIsShowModalConfirm(true);
  };

  const handleSubmitCreateSubject = (data) => {
    dispatch(setLoading(true));
    dispatch(createNewSubject(data))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setFormValue({ ...initialValues });
          setIsShowModal(false);
        }
      })
      .catch((err) => {
        console.log('wrap err', err);
        if (errorJwt(err)) {
          dispatch(logout());
          history.push('/signin');
        }
        setErrorMessage(err?.message);
      });
  };

  const handleSubmitUpdateSubject = (data) => {};

  const handleSubmitDeleteSubject = () => {
    dispatch(setLoading(true));
    dispatch(deleteSubjectById({ subjectId: formValue?.subjectId }))
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
      dataField: 'subjectId',
      text: 'Mã môn học',
      sort: true
    },
    {
      dataField: 'name',
      text: 'Tên môn học',
      sort: true
    },

    {
      dataField: '',
      text: 'Thao tác',
      // isDummyField: true,
      sort: false,
      formatter: (cellContent, row, rowIndex) => {
        let disabled = row?.questionSubjectData?.length > 0 ? true : false;
        return (
          <>
            {/* <Button variant="warning" disabled={disabled} className="btn-icon" onClick={() => {}}>
              <i className="feather icon-edit" />
            </Button> */}
            <Button variant="danger" disabled={disabled} className="btn-icon" onClick={() => handleDeleteSubject(row)}>
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
        title={`Bạn có chắc chắn muốn xóa môn học này?`}
        data={`Môn học: ${formValue.subjectId}`}
        isShowModalConfirm={isShowModalConfirm}
        setIsShowModalConfirm={setIsShowModalConfirm}
        handleSubmitForm={handleSubmitDeleteSubject}
        isText={false}
      />

      <SubjectForm
        title={typeAction.message}
        isDetail={typeAction.type === ACTION_TYPE.DETAIL.type ? true : false}
        isUpdate={typeAction.type === ACTION_TYPE.UPDATE.type ? true : false}
        data={formValue}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        handleSubmitForm={typeAction.type === ACTION_TYPE.CREATE.type ? handleSubmitCreateSubject : handleSubmitUpdateSubject}
        errorMessage={errorMessage}
      />

      <Row>
        <Col>
          <TableList
            isShowButtonCreate={true}
            keyField="subjectId"
            title={`Danh sách môn học: ${subjectList.length}`}
            dataList={subjectList}
            columns={columns}
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            handleCreateNew={handleCreateNew}
          ></TableList>
        </Col>
      </Row>
    </>
  );
};

export default Subject;
