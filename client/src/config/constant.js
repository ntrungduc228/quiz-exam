export const BASENAME = ''; // don't add '/' at end off BASENAME
// export const BASE_URL = '/app/dashboard/default';
export const BASE_URL = '/dashboard';
export const BASE_TITLE = ' | Datta Able Premium React Hooks + Redux Admin Template';
export const API_SERVER = process.env.REACT_APP_API_SERVER || 'http://localhost:5000/api';

export const ACTION_TYPE = {
  CREATE: { type: 'CREATE', message: 'Thêm mới' },
  UPDATE: { type: 'UPDATE', message: 'Cập nhật' },
  DETAIL: { type: 'DETAIL', message: 'Thông tin' }
};

export const STATE = {
  active: 1,
  needConfirm: 2,
  lock: 0
};

export const ROLES = {
  admin: 0,
  teacher: 1,
  student: 2
};

export const LEVEL = {
  easy: { id: 0, message: 'Dễ' },
  medium: { id: 1, message: 'Trung bình' },
  hard: { id: 2, message: 'Khó' }
};

export const ANSWER = [{ value: 'A' }, { value: 'B' }, { value: 'C' }, { value: 'D' }];

export const DASHBOARD_ROUTE = {
  admin: {
    path: '/admin/dashboard'
  },
  teacher: {
    path: '/teacher/dashboard'
  },
  student: {
    path: BASE_URL
  }
};

export const CONFIG = {
  layout: 'vertical', // disable on free version
  subLayout: '', // disable on free version
  collapseMenu: false, // mini-menu
  layoutType: 'menu-dark', // disable on free version
  navIconColor: false, // disable on free version
  headerBackColor: 'header-default', // disable on free version
  navBackColor: 'navbar-default', // disable on free version
  navBrandColor: 'brand-default', // disable on free version
  navBackImage: false, // disable on free version
  rtlLayout: false, // disable on free version
  navFixedLayout: true, // disable on free version
  headerFixedLayout: false, // disable on free version
  boxLayout: false, // disable on free version
  navDropdownIcon: 'style1', // disable on free version
  navListIcon: 'style1', // disable on free version
  navActiveListColor: 'active-default', // disable on free version
  navListTitleColor: 'title-default', // disable on free version
  navListTitleHide: false, // disable on free version
  configBlock: true, // disable on free version
  layout6Background: 'linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)', // disable on free version
  layout6BackSize: '', // disable on free version
  firebase: {
    apiKey: 'AIzaSyAlA-jy7dpv4SxGD_6Ka1i5l6YOJANVyJU',
    authDomain: 'datta-able-react-hook.firebaseapp.com',
    projectId: 'datta-able-react-hook',
    storageBucket: 'datta-able-react-hook.appspot.com',
    messagingSenderId: '194472541027',
    appId: '1:194472541027:web:462efb7a5035da914ef156',
    measurementId: 'G-M4PFJDM1EZ'
  }
};
