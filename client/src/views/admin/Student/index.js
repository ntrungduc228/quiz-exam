import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { ACTION_TYPE, STATE } from '../../../config/constant';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getAllStudents, setLoading, createNewStudent, updateStudentById, changeState } from '../../../store/slices/student';
import StudentForm from './StudentForm';
import FormState from './FormState';

const Student = () => {
  const initialValues = useRef({
    classId: '',
    studentId: '',
    lastName: '',
    firstName: '',
    gender: true,
    email: '',
    birthday: '',
    phone: ''
  }).current;
  const [formValue, setFormValue] = useState(initialValues);
  const [studentList, setStudentList] = useState([]);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.CREATE);
  const [errorMessage, setErrorMessage] = useState('');

  const { students, isLoading } = useSelector((state) => state.student);
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(getAllStudents())
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log(err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });
  }, []);

  useEffect(() => {
    setStudentList(students);
  }, [students]);

  const handleShowDetailInfo = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.DETAIL);
    setErrorMessage('');
  };

  const handleCreateNew = () => {
    setFormValue(initialValues);
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.CREATE);
    setErrorMessage('');
  };

  const handleUpdateStudent = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.UPDATE);
    setErrorMessage('');
  };

  const handleChangeState = (data) => {
    setFormValue({ ...data });
    setIsShowModalConfirm(true);
  };

  const handleSubmitCreateStudent = async (data) => {
    await dispatch(setLoading(true));
    dispatch(createNewStudent(data))
      .unwrap()
      .then((res) => {
        if (res.success) {
          addToast(res.message, { appearance: 'success' });
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
  const handleSubmitUpdateStudent = async (data) => {
    await dispatch(setLoading(true));
    dispatch(updateStudentById({ studentId: formValue.studentId, newData: { ...data } }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          addToast(res.message, { appearance: 'success' });
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

  const handleSubmitChangeState = async (data) => {
    await dispatch(setLoading(true));

    dispatch(changeState({ username: data.username, newData: { state: data.state } }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          addToast(res.message, { appearance: 'success' });
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
        addToast(err?.message, { appearance: 'error' });
      });
  };

  const columns = [
    {
      dataField: 'studentId',
      text: 'Mã sinh viên',
      sort: true
    },
    {
      dataField: 'fullName',
      text: 'Họ tên',
      sort: true
    },
    {
      dataField: 'gender',
      text: 'Phái',
      sort: true,
      formatter: (celContent) => (celContent ? 'Nam' : 'Nữ')
    },
    {
      dataField: 'phone',
      text: 'Sô điện thoại',
      sort: true
    },
    {
      dataField: 'studentAccountData.state',
      text: 'Trạng thái',
      sort: true,
      formatter: (celContent) => {
        let variant = '';
        let nameState = '';
        switch (celContent) {
          case STATE.active: {
            variant = 'success';
            nameState = 'Hoạt động';
            break;
          }
          case STATE.needConfirm: {
            variant = 'warning';
            nameState = 'Chờ xác nhận';

            break;
          }
          case STATE.lock: {
            variant = 'danger';
            nameState = 'Bị khóa';

            break;
          }
          default: {
          }
        }

        return (
          <Badge pill variant={variant} className="mr-1">
            <span style={{}}> {nameState}</span>
          </Badge>
        );
      }
    },
    {
      dataField: '',
      text: 'Thao tác',
      // isDummyField: true,
      sort: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <>
            <Button variant="info" className="btn-icon" onClick={() => handleShowDetailInfo(row)}>
              <i className="feather icon-info" />
            </Button>
            <Button variant="warning" className="btn-icon" onClick={() => handleUpdateStudent(row)}>
              <i className="feather icon-edit" />
            </Button>
            <Button variant="danger" className="btn-icon" key={(rowIndex + 1) * students.length} onClick={() => handleChangeState(row)}>
              <i className="feather icon-check-circle" />
            </Button>
          </>
        );
      }
    }
  ];
  return (
    <>
      <FormState
        isLoading={isLoading}
        title={`Thay đổi trạng thái cho sinh viên ${formValue.studentId}`}
        data={formValue}
        isShowModalConfirm={isShowModalConfirm}
        setIsShowModalConfirm={setIsShowModalConfirm}
        handleSubmitForm={handleSubmitChangeState}
      />

      <StudentForm
        title={typeAction.message}
        isDetail={typeAction.type === ACTION_TYPE.DETAIL.type ? true : false}
        isUpdate={typeAction.type === ACTION_TYPE.UPDATE.type ? true : false}
        data={formValue}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        handleSubmitForm={typeAction.type === ACTION_TYPE.CREATE.type ? handleSubmitCreateStudent : handleSubmitUpdateStudent}
        errorMessage={errorMessage}
      />

      <Row>
        <Col>
          <TableList
            keyField="studentId"
            title={`Danh sách sinh viên: ${studentList.length}`}
            dataList={studentList}
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

export default Student;
