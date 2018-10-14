import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import './style.css';
import Dashboard from './views/dashboard/dashboard';
import api from './api';

ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root')
);

api.connect();

module.hot.accept();
