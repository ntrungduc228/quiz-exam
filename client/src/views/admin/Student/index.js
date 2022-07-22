import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPE, STATE } from '../../../config/constant';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getAllStudents, setLoading, createNewStudent, updateStudentById, changeState } from '../../../store/slices/student';
import StudentForm from './StudentForm';
import FormState from '../../../components/FormState';
import toast from 'react-hot-toast';
import { selectFilter } from 'react-bootstrap-table2-filter';
import { getAllClasses } from '../../../store/slices/class';

const stateFilter = [
  { value: STATE.active, label: 'Hoạt động' },
  { value: STATE.lock, label: 'Bị khóa' },
  { value: STATE.needConfirm, label: 'Chờ xác nhận' }
];

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
  const [classList, setClassList] = useState([]);

  const { students, isLoading } = useSelector((state) => state.student);
  const { classes } = useSelector((state) => state.class);

  const history = useHistory();
  const dispatch = useDispatch();

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
  }, [dispatch, history]);

  useEffect(() => {
    setStudentList(students);
  }, [students]);

  useEffect(() => {
    let arr = classes.map((item) => ({ label: item.classId, value: item.classId }));
    setClassList([...arr]);
  }, [classes]);

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
    setFormValue({ ...data, username: data.studentId, state: data?.studentAccountData.state });
    setIsShowModalConfirm(true);
  };

  const handleSubmitCreateStudent = async (data) => {
    await dispatch(setLoading(true));
    dispatch(createNewStudent(data))
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
  const handleSubmitUpdateStudent = async (data) => {
    await dispatch(setLoading(true));
    dispatch(updateStudentById({ studentId: formValue.studentId, newData: { ...data } }))
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

  const handleSubmitChangeState = async (data) => {
    await dispatch(setLoading(true));

    dispatch(changeState({ username: data.username, newData: { state: data.state } }))
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
      dataField: 'classId',
      text: 'Mã lớp',
      sort: true,
      filter: selectFilter({
        options: classList,
        placeholder: 'Chọn lớp học'
      })
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
      },
      filter: selectFilter({
        options: stateFilter,
        placeholder: 'Chọn trạng thái'
      })
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
            isShowButtonCreate={true}
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
