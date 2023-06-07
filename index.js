import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
/*REcat bootsatrap COnfigration*/
import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import store from './components/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

