import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import config from '../awsmobilejs/#current-backend-info/aws-exports';
import App from './App';
Amplify.configure(config);

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
