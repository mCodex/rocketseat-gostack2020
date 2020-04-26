import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';

import App from './pages/Home';

import * as serviceWorker from './serviceWorker';

import api from './services/api';

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (...args) => api(...args).then((res) => res.data),
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
