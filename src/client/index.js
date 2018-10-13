import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import Dashboard from './views/dashboard/dashboard';

ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root')
);

module.hot.accept();
