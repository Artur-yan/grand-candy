import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import '../src/assets/fonts/icons/style.css';
import '../src/assets/styles/normalize.scss';
import '../src/assets/styles/global.scss';

ReactDOM.render(
  <React.Fragment>
    <Routes/>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
