import React, { useContext, useState, useEffect } from 'react';
import { ListGroup, Dropdown, Media, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';

import { ConfigContext } from '../../../contexts/ConfigContext';
import { logout } from '../../../store/slices/auth';

const NavbarStudent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const configContext = useContext(ConfigContext);
  const { rtlLayout } = configContext.state;
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
  }, [user]);

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown alignRight={!rtlLayout} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
              <div className="pro-head">
                {/* <img src="" className="img-radius" alt="User Profile" /> */}
                <span className="text-break">{user.lastName + ' ' + user.firstName}</span>
                <Link to="#" className="dud-logout" title="Đăng xuất" onClick={handleLogout}>
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/profile" className="dropdown-item">
                    <i className="feather icon-user" /> Tài khoản
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/score" className="dropdown-item">
                    <i className="feather icon-book" /> Điểm thi
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavbarStudent;
