import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { Toaster } from 'react-hot-toast';

import './index.scss';
import './_custom.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider>
      <App />
      <Toaster
        position="top-right"
        containerStyle={{
          top: 60,
          left: 20,
          bottom: 20,
          right: 20
        }}
        toastOptions={{ duration: 5000 }}
      />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
