import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPE, STATE } from '../../../config/constant';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getAllTeachers, setLoading, createNewTeacher, updateTeacherById, changeState } from '../../../store/slices/teacher';
import TeacherForm from './TeacherForm';
import FormState from '../../../components/FormState';

const Teacher = () => {
  const initialValues = useRef({
    teacherId: '',
    lastName: '',
    firstName: '',
    gender: true,
    email: '',
    phone: ''
  }).current;

  const [formValue, setFormValue] = useState(initialValues);
  const [teacherList, setTeacherList] = useState([]);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.CREATE);
  const [errorMessage, setErrorMessage] = useState('');

  const { teachers, isLoading } = useSelector((state) => state.teacher);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeachers())
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
    setTeacherList(teachers);
  }, [teachers]);

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

  const handleUpdateTeacher = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.UPDATE);
    setErrorMessage('');
  };

  const handleChangeState = (data) => {
    setFormValue({ ...data, username: data.teacherId, state: data?.teacherAccountData.state });
    setIsShowModalConfirm(true);
  };

  const columns = [
    {
      dataField: 'teacherId',
      text: 'Mã giảng viên',
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
      dataField: 'teacherAccountData.state',
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
            <Button variant="warning" className="btn-icon" onClick={() => handleUpdateTeacher(row)}>
              <i className="feather icon-edit" />
            </Button>
            <Button variant="danger" className="btn-icon" onClick={() => handleChangeState(row)}>
              <i className="feather icon-check-circle" />
            </Button>
          </>
        );
      }
    }
  ];

  return (
    <>
      <Row>
        <Col>
          <TableList
            keyField="teacherId"
            title={`Danh sách giảng viên: ${teacherList.length}`}
            dataList={teacherList}
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

export default Teacher;
