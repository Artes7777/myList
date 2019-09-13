import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import Routing from './components/Routing';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MuiThemeProvider>
      <Routing />
    </MuiThemeProvider>,
  document.getElementById('root'));
registerServiceWorker();
