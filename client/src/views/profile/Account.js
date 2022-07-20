import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Card, Tabs, Tab, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ROLES } from '../../config/constant';
import { changePassword, updateProfileInfo, setLoading } from '../../store/slices/auth';
import toast from 'react-hot-toast';

const schema = yup
  .object({
    isStudent: yup.boolean(),
    isChangePassword: yup.boolean(),
    lastName: yup.string().when('isChangePassword', {
      is: false,
      then: yup.string().required('Vui lòng nhập họ'),
      otherwise: yup.string().notRequired('')
    }),
    firstName: yup.string().when('isChangePassword', {
      is: false,
      then: yup.string().required('Vui lòng nhập tên'),
      otherwise: yup.string().notRequired('')
    }),
    gender: yup.string().when('isChangePassword', {
      is: false,
      then: yup.string().required('Vui lòng chọn giới tính'),
      otherwise: yup.string().notRequired('')
    }),
    phone: yup.string().when('isChangePassword', {
      is: false,
      then: yup.string('Vui lòng nhập số điện thoại hợp lệ').required('Vui lòng nhập số điện thoại'),
      otherwise: yup.string('Vui lòng nhập số điện thoại hợp lệ').notRequired('')
    }),
    birthday: yup.string().when('isStudent', {
      is: true,
      then: yup.string().required('Vui lòng nhập ngày sinh'),
      otherwise: yup.string().notRequired('')
    }),
    password: yup.string().when('isChangePassword', {
      is: true,
      then: yup.string().required('Vui lòng nhập mật khẩu'),
      otherwise: yup.string().notRequired('')
    }),
    newPassword: yup.string().when('isChangePassword', {
      is: true,
      then: yup.string().min(6, 'Mật khẩu tối thiểu 6 kí tự').required('Vui lòng nhập mật khẩu mới'),
      otherwise: yup.string().notRequired('')
    }),
    confirmPassword: yup.string().when('isChangePassword', {
      is: true,
      then: yup
        .string()
        .required('Vui lòng nhập lại mật khẩu')
        .oneOf([yup.ref('newPassword'), null], 'Xác nhận mật khẩu không trùng'),
      otherwise: yup.string().notRequired('')
    })
  })
  .required();

const Account = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [chooseGender, setChooseGender] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [tab, setTab] = useState('profile');

  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  useEffect(() => {
    setValue('username', user.username);
    setValue('email', user.email);
    setValue('lastName', user.lastName);
    setValue('firstName', user.firstName);
    setValue('gender', user.gender);
    setValue('phone', user.phone);
    if (user?.role === ROLES.student) {
      setValue('isStudent', true);
      setValue('classId', user.classId);
      setValue('birthday', user.birthday);
      setIsDisabled(false);
    } else {
      setValue('isStudent', false);
      setIsDisabled(true);
    }

    clearErrors();
  }, [user]);

  useEffect(() => {
    if (tab === 'profile') {
      setValue('isChangePassword', false);
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('lastName', user.lastName);
      setValue('firstName', user.firstName);
      setValue('gender', user.gender);
      setValue('phone', user.phone);
      if (user?.role === ROLES.student) {
        setValue('isStudent', true);
        setValue('classId', user.classId);
        setValue('birthday', user.birthday);
        setIsDisabled(false);
      } else {
        setValue('isStudent', false);
        setIsDisabled(true);
      }
    } else if (tab === 'password') {
      setValue('isChangePassword', true);
    }
  }, [tab]);

  const onSubmitUpdateProfile = (data) => {
    let newData = {
      lastName: data.lastName,
      firstName: data?.firstName,
      phone: data?.phone,
      gender: chooseGender
    };
    if (user.role === ROLES.student) {
      newData.birthday = data?.birthday;
    }

    dispatch(setLoading(true));
    dispatch(updateProfileInfo({ username: user.username, newData: newData }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      })
      .catch(async (err) => {
        console.log('wrap err', err);
        setErrorMessage(err?.message);
      });

    console.log('dataa', data);
  };
  const onSubmitChangePassword = (data) => {
    dispatch(setLoading(true));
    dispatch(changePassword({ username: user.username, password: data.password, newData: { password: data.newPassword } }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setValue('password', '');
          setValue('newPassword', '');
          setValue('confirmPassword', '');
        }
      })
      .catch(async (err) => {
        console.log('wrap err', err);
        setErrorMessage(err?.message);
      });
  };

  console.log('errors', errors);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Thông tin cá nhân</Card.Title>
            </Card.Header>
            <Card.Body>
              <Tabs variant="pills" defaultActiveKey="profile" className="" onSelect={(key) => setTab(key)}>
                <Tab eventKey="profile" title="Thông tin cá nhân">
                  <Form>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Username</Form.Label>
                          <Form.Control name="username" type="text" placeholder="Username" {...register('username')} disabled={true} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control name="email" type="email" placeholder="Email" {...register('email')} disabled={true} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Họ</Form.Label>
                          <Form.Control name="lastName" type="text" placeholder="Họ" {...register('lastName')} />
                          {errors?.lastName && <p className="text-danger form-text">{errors?.lastName.message}</p>}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Tên</Form.Label>
                          <Form.Control name="firstName" type="text" placeholder="Tên" {...register('firstName')} />
                          {errors?.firstName && <p className="text-danger form-text">{errors?.firstName.message}</p>}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Phái</Form.Label>
                          <Form.Group>
                            <Form.Check
                              inline
                              checked={chooseGender ? true : false}
                              custom
                              type="radio"
                              label="Nam"
                              name="gender"
                              id="male"
                              required
                              value={true}
                              onChange={() => setChooseGender(true)}
                            />
                            <Form.Check
                              inline
                              checked={!chooseGender ? true : false}
                              custom
                              type="radio"
                              label="Nữ"
                              name="gender"
                              id="female"
                              required
                              value={false}
                              onChange={() => setChooseGender(false)}
                            />
                            {errors?.gender && <p className="text-danger form-text">{errors?.gender.message}</p>}
                          </Form.Group>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Số điện thoại</Form.Label>
                          <Form.Control name="phone" type="text" placeholder="Số điện thoại" {...register('phone')} />
                          {errors?.phone && <p className="text-danger form-text">{errors?.phone.message}</p>}
                        </Form.Group>
                      </Col>
                    </Row>
                    {!isDisabled ? (
                      <Row className="d-flex justify-content-center">
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Lớp</Form.Label>
                            <Form.Control name="classId" type="text" placeholder="Lớp" {...register('classId')} disabled={true} />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control name="birthday" type="date" placeholder="Ngày sinh" {...register('birthday')} />
                            {errors?.birthday && <p className="text-danger form-text">{errors?.birthday.message}</p>}
                          </Form.Group>
                        </Col>
                      </Row>
                    ) : (
                      <React.Fragment />
                    )}
                    <Row>
                      <Col className="mt-4" sm={{ span: 10, offset: 5 }}>
                        {errorMessage && <p className=" text-danger form-text">{errorMessage}</p>}
                        <Button onClick={handleSubmit(onSubmitUpdateProfile)} disabled={isLoading} color="info" className="shadow-3 btn">
                          {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                          <span>&nbsp; Lưu</span>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Tab>
                <Tab eventKey="password" title="Đổi mật khẩu">
                  <Form>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Nhập mật khẩu</Form.Label>
                          <Form.Control type="password" name="password" {...register('password')} />
                          {errors?.password && <p className="text-danger form-text">{errors?.password.message}</p>}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Mật khẩu mới</Form.Label>
                          <Form.Control type="password" name="newPassword" {...register('newPassword')} />
                          {errors?.newPassword && <p className="text-danger form-text">{errors?.newPassword.message}</p>}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                          <Form.Control type="password" name="confirmPassword" {...register('confirmPassword')} />
                          {errors?.confirmPassword && <p className="text-danger form-text">{errors?.confirmPassword.message}</p>}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="mt-4" sm={{ span: 10, offset: 5 }}>
                        {errorMessage && <p className=" text-danger form-text">{errorMessage}</p>}
                        <Button onClick={handleSubmit(onSubmitChangePassword)} disabled={isLoading} color="info" className="shadow-3 btn">
                          {isLoading && <Spinner animation="border" role="status" size="sm" variant="light" />}
                          <span>&nbsp; Lưu</span>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Account;
