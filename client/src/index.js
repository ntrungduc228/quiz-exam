import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { ToastProvider } from 'react-toast-notifications';

import './index.scss';
import './_custom.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider>
      <ToastProvider autoDismiss placement="top-right">
        <App />
      </ToastProvider>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
