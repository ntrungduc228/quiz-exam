import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import errorJwt from '../../../utils/errorJwt';
import { logout } from '../../../store/slices/auth';
import { getDashBoardAdmin } from '../../../store/slices/home';

let labels = [
  { label: 'Sinh viên', link: '/admin/student' },
  { label: 'Môn học', link: '/admin/subject' },
  { label: 'Câu hỏi', link: '/admin/question' },
  { label: 'Lớp học', link: '/admin/class' },
  { label: 'Bài thi', link: '/admin/exam' },
  { label: 'Kết quả', link: '/admin/score' },
  { label: 'Giảng viên', link: '/admin/teacher' }
];

const Dashboard = () => {
  const [dashboardList, setDashboardList] = useState([]);

  const { dashboard } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDashBoardAdmin())
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
    setDashboardList(dashboard);
  }, [dashboard]);

  return (
    <React.Fragment>
      <Row>
        {dashboardList.length >0 &&
          dashboardList.map((item, index) => (
            <React.Fragment key={labels[index]?.link}>
              <Col md={6} xl={4}>
                <Link to={labels[index]?.link}>
                  <Card>
                    <Card.Body>
                      <h4 className="mb-4">{labels[index]?.label}</h4>
                      <div className="row d-flex align-items-center">
                        <div className="col-9">
                          <h3 className="f-w-300 d-flex align-items-center m-b-0">
                            <i className="feather icon-folder text-c-green f-30 m-r-5" /> {item}
                          </h3>
                        </div>
                        {/* <div className="col-3 text-right"><p className="m-b-0">50%</p></div> */}
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </React.Fragment>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default Dashboard;
