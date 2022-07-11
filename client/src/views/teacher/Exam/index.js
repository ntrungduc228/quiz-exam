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
import { setLoading, getAllExams } from '../../../store/slices/exam';
import ExamForm from './ExamForm';

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
  const [examList, setexamList] = useState([]);

  const { exams, isLoading } = useSelector((state) => state.exam);
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
  }, []);

  useEffect(() => {
    setexamList(exams);
  }, [exams]);

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

  const handleChangeStateExam = (data) => {};
  const handleDeleteExam = (data) => {};

  const handleSubmitCreateExam = async (data) => {};

  const columns = [
    {
      dataField: 'classId',
      text: 'Mã lớp',
      sort: true
    },
    {
      dataField: 'examSubjectData.name',
      text: 'Môn học',
      sort: true
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
      <ExamForm
        title={typeAction.message}
        isDetail={typeAction.type === ACTION_TYPE.DETAIL.type ? true : false}
        isUpdate={typeAction.type === ACTION_TYPE.UPDATE.type ? true : false}
        data={formValue}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        handleSubmitForm={typeAction.type === ACTION_TYPE.CREATE.type ? handleSubmitCreateExam : () => {}}
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
