import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import TableList from '../../../components/TableList';
import { getAllSubjects } from '../../../store/slices/subject';
import { selectFilter } from 'react-bootstrap-table2-filter';
import { getAllTeachers } from '../../../store/slices/teacher';
import { ACTION_TYPE, LEVEL } from '../../../config/constant';
import { getAllQuestions } from '../../../store/slices/question';
import QuestionForm from './QuestionForm';

const levelFilter = [
  { value: LEVEL.easy.id, label: 'Dễ' },
  { value: LEVEL.medium.id, label: 'Trung bình' },
  { value: LEVEL.hard.id, label: 'Khó' }
];

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
  const [isShowModal, setIsShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState(ACTION_TYPE.CREATE);
  const [questionList, setQuestionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const { subjects } = useSelector((state) => state.subject);
  const { questions } = useSelector((state) => state.question);
  const { teachers } = useSelector((state) => state.teacher);

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
    setQuestionList(questions);
  }, [questions]);

  useEffect(() => {
    let arr = teachers.map((item) => ({ label: item.teacherId, value: item.teacherId }));
    setTeacherList([...arr]);
  }, [teachers]);

  useEffect(() => {
    let arr = subjects.map((item) => ({ label: item.name, value: item.name }));
    setSubjectList([...arr]);
  }, [subjects]);

  const handleShowDetailInfo = (data) => {
    setFormValue({ ...data });
    setIsShowModal(true);
    setTypeAction(ACTION_TYPE.DETAIL);
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
      sort: true,
      filter: selectFilter({
        options: subjectList,
        placeholder: 'Chọn môn học'
      })
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
      },
      filter: selectFilter({
        options: levelFilter,
        placeholder: 'Chọn trình độ'
      })
    },
    {
      dataField: 'teacherId',
      text: 'Mã GV',
      sort: true,
      filter: selectFilter({
        options: teacherList,
        placeholder: 'Chọn giảng viên'
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
      <QuestionForm
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
            keyField="questionId"
            title={`Danh sách câu hỏi: ${questionList.length}`}
            dataList={questionList}
            columns={columns}
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            handleCreateNew={() => {}}
          ></TableList>
        </Col>
      </Row>
    </>
  );
};

export default Question;
