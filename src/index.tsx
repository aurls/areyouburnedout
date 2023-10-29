import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import store from './store';
import Root from './components/Root';

import theme from './assets/style/theme';
import './assets/style/reset.scss';
import './assets/style/global.scss';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <Root />
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  );
