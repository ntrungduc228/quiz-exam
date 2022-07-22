import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { ACTION_TYPE, STATE_EXAM } from '../../../config/constant';
import toast from 'react-hot-toast';
import Confirm from '../../../components/Confirm';
import { setLoading, getAllExams, changeStateExam, deleteExam, createNewExam } from '../../../store/slices/exam';
import ExamForm from './ExamForm';
import { selectFilter } from 'react-bootstrap-table2-filter';
import { getAllClasses } from '../../../store/slices/class';
import { getAllSubjects } from '../../../store/slices/subject';

const stateFilter = [
  {
    value: STATE_EXAM.open,
    label: 'Mở'
  },
  { value: STATE_EXAM.close, label: 'Đóng' }
];

const Exam = () => {
  const initialValues = useRef({
    classId: '',
    subjectId: '',
    times: '',
    teacherId: '',
    timeExam: '',
    dateExam: '',
    numOfEasy: '',
    numOfMedium: '',
    numOfHard: ''
  }).current;
  const [formValue, setFormValue] = useState(initialValues);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.CREATE);
  const [errorMessage, setErrorMessage] = useState('');
  const [examList, setExamList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [classList, setClassList] = useState([]);

  const { subjects } = useSelector((state) => state.subject);
  const { exams, isLoading } = useSelector((state) => state.exam);
  const { classes } = useSelector((state) => state.class);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExams())
      .unwrap()
      .then(() => {})
      .catch(async (err) => {
        console.log(err);
        if (errorJwt(err)) {
          await dispatch(logout());
          history.push('/signin');
        }
      });

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
    setExamList(exams);
  }, [exams]);

  useEffect(() => {
    let arr = classes.map((item) => ({ label: item.classId, value: item.classId }));
    setClassList([...arr]);
  }, [classes]);

  useEffect(() => {
    let arr = subjects.map((item) => ({ label: item.name, value: item.name }));
    setSubjectList([...arr]);
  }, [subjects]);

  const handleCreateNew = () => {
    setFormValue(initialValues);
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.CREATE);
    setErrorMessage('');
  };

  const handleShowDetailInfo = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.DETAIL);
    setErrorMessage('');
  };

  const handleChangeStateExam = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.UPDATE);
    setErrorMessage('');
  };
  const handleDeleteExam = (data) => {
    setFormValue({ ...data });
    setIsShowModalConfirm(true);
  };

  const handleSubmitCreateExam = async (data) => {
    dispatch(setLoading(true));
    dispatch(createNewExam({ ...data, teacherId: user.userId }))
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
          dispatch(logout());
          history.push('/signin');
        }
        setErrorMessage(err?.message);
      });
  };

  const handleSubmitChangeStateExam = async (data) => {
    dispatch(setLoading(true));
    dispatch(changeStateExam({ ...data, newData: { state: data.state } }))
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

  const handleSubmitDeleteExam = async () => {
    console.log('formvaue', formValue);
    dispatch(setLoading(true));
    dispatch(deleteExam({ ...formValue }))
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
      sort: true,
      filter: selectFilter({
        options: classList,
        placeholder: 'Chọn lớp học'
      })
    },
    {
      dataField: 'examSubjectData.name',
      text: 'Môn học',
      sort: true,
      filter: selectFilter({
        options: subjectList,
        placeholder: 'Chọn môn học'
      })
    },
    {
      dataField: 'times',
      text: 'Lần thi',
      sort: true
    },
    {
      dataField: 'dateExam',
      text: 'Ngày thi',
      sort: true
    },
    {
      dataField: 'state',
      text: 'Trạng thái',
      sort: true,
      formatter: (cellContent, row, rowIndex) => {
        let variant = '';
        let nameState = '';
        if (cellContent === STATE_EXAM.open) {
          variant = 'success';
          nameState = 'Mở';
        } else if (cellContent === STATE_EXAM.close) {
          variant = 'danger';
          nameState = 'Đóng';
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
            <Button variant="warning" className="btn-icon" onClick={() => handleChangeStateExam(row)}>
              <i className="feather icon-edit" />
            </Button>

            <Button variant="danger" className="btn-icon" onClick={() => handleDeleteExam(row)}>
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
        title={`Bạn có chắc chắn muốn xóa đề thi này?`}
        data={`Đề thi: ${formValue.classId} ${formValue.subjectId} ${formValue.times}`}
        isShowModalConfirm={isShowModalConfirm}
        setIsShowModalConfirm={setIsShowModalConfirm}
        handleSubmitForm={handleSubmitDeleteExam}
        isText={false}
      />

      <ExamForm
        title={typeAction.message}
        isDetail={typeAction.type === ACTION_TYPE.DETAIL.type ? true : false}
        isUpdate={typeAction.type === ACTION_TYPE.UPDATE.type ? true : false}
        data={formValue}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        handleSubmitForm={typeAction.type === ACTION_TYPE.CREATE.type ? handleSubmitCreateExam : handleSubmitChangeStateExam}
        errorMessage={errorMessage}
      />

      <Row>
        <Col>
          <TableList
            isShowButtonCreate={true}
            keyField="keyField"
            title={`Danh sách bài thi: ${examList.length}`}
            dataList={examList}
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

export default Exam;
