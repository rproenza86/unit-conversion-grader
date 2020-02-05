import React from 'react';
import ReactDOM from 'react-dom';

// main app dependencies
import './components/main/index.css';
import App from './components/main/App';

// service worker
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
