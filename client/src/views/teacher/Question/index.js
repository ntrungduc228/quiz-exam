import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { ACTION_TYPE, LEVEL } from '../../../config/constant';
import { getAllQuestions, setLoading, createNewQuestion, updateQuestionById, deleteQuestionById } from '../../../store/slices/question';
import QuestionForm from './QuestionForm';
import toast from 'react-hot-toast';
import Confirm from '../../../components/Confirm';

const Question = () => {
  const initialValues = useRef({
    content: '',
    answerA: '',
    answerB: '',
    answerC: '',
    answerD: '',
    correctAnswer: '',
    teacherId: '',
    level: '',
    subjectId: ''
  }).current;
  const [formValue, setFormValue] = useState(initialValues);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.CREATE);
  const [errorMessage, setErrorMessage] = useState('');
  const [questionList, setQuestionList] = useState([]);

  const { questions, isLoading } = useSelector((state) => state.question);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuestions())
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
    setQuestionList(questions);
  }, [questions]);

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

  const handleUpdateQuestion = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.UPDATE);
    setErrorMessage('');
  };

  const handleDeleteQuestion = (data) => {
    setFormValue({ ...data });
    setIsShowModalConfirm(true);
  };

  const handleSubmitCreateQuestion = async (data) => {
    await dispatch(setLoading(true));
    dispatch(createNewQuestion({ ...data, level: +data.level, teacherId: user.userId }))
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

  const handleSubmitUpdateQuestion = async (data) => {
    await dispatch(setLoading(true));
    dispatch(updateQuestionById({ questionId: formValue.questionId, newData: { ...data, level: +data.level, teacherId: user.userId } }))
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

  const handleSubmitDeleteQuestion = async (data) => {
    await dispatch(setLoading(true));

    dispatch(deleteQuestionById({ questionId: formValue?.questionId }))
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
      dataField: 'questionId',
      text: 'Mã câu hỏi',
      sort: true
    },
    {
      dataField: 'content',
      text: 'Nội dung',
      sort: true
    },
    {
      dataField: 'questionSubjectData.name',
      text: 'Môn học',
      sort: true
    },
    {
      dataField: 'level',
      text: 'Trình độ',
      sort: true,
      formatter: (cellContent) => {
        let nameLevel = '';
        switch (cellContent) {
          case LEVEL.easy.id: {
            nameLevel = LEVEL.easy.message;
            break;
          }
          case LEVEL.medium.id: {
            nameLevel = LEVEL.medium.message;
            break;
          }
          case LEVEL.hard.id: {
            nameLevel = LEVEL.hard.message;
            break;
          }

          default: {
          }
        }
        return nameLevel;
      }
    },
    {
      dataField: 'teacherId',
      text: 'Mã GV',
      sort: true
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
            <Button variant="warning" className="btn-icon" key={rowIndex} onClick={() => handleUpdateQuestion(row)}>
              <i className="feather icon-edit" />
            </Button>

            <Button variant="danger" className="btn-icon" key={(rowIndex + 1) * questions.length} onClick={() => handleDeleteQuestion(row)}>
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
        title={`Bạn có chắc chắn muốn xóa câu hỏi này?`}
        data={`Câu hỏi: ${formValue.questionId}`}
        isShowModalConfirm={isShowModalConfirm}
        setIsShowModalConfirm={setIsShowModalConfirm}
        handleSubmitForm={handleSubmitDeleteQuestion}
        isText={false}
      />
      <QuestionForm
        title={typeAction.message}
        isDetail={typeAction.type === ACTION_TYPE.DETAIL.type ? true : false}
        isUpdate={typeAction.type === ACTION_TYPE.UPDATE.type ? true : false}
        data={formValue}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        handleSubmitForm={typeAction.type === ACTION_TYPE.CREATE.type ? handleSubmitCreateQuestion : handleSubmitUpdateQuestion}
        errorMessage={errorMessage}
      />

      <Row>
        <Col>
          <TableList
            isShowButtonCreate={true}
            keyField="questionId"
            title={`Danh sách câu hỏi: ${questionList.length}`}
            dataList={questionList}
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

export default Question;
