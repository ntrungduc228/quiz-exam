import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableList from '../../../components/TableList';
import errorJwt from '../../../utils/errorJwt';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/slices/auth';
import { getAllStudents } from '../../../store/slices/student';
import StudentForm from './StudentForm';
import { ACTION_TYPE, STATE } from '../../../config/constant';
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
  const [isShowModal, setIsShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.DETAIL);
  const [classList, setClassList] = useState([]);

  const { students } = useSelector((state) => state.student);
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
          </>
        );
      }
    }
  ];

  return (
    <>
      <StudentForm
        title={typeAction.message}
        isDetail={true}
        isUpdate={false}
        data={formValue}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        handleSubmitForm={() => {}}
        errorMessage={''}
      />

      <Row>
        <Col>
          <TableList
            isShowButtonCreate={false}
            keyField="studentId"
            title={`Danh sách sinh viên: ${studentList.length}`}
            dataList={studentList}
            columns={columns}
            isShowModal={false}
            setIsShowModal={() => {}}
            handleCreateNew={() => {}}
          ></TableList>
        </Col>
      </Row>
    </>
  );
};

export default Student;
