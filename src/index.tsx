import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import Root from './layouts/Root';

import './assets/style/reset.scss';
import './assets/style/global.scss';
import './assets/style/fonts.scss';

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <Provider store={store}>
        <Root />
      </Provider>
    </React.StrictMode>
  );
