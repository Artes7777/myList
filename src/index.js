import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import Routing from './components/Routing';
import {Provider} from 'react-redux';
import {store} from './store/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MuiThemeProvider>
      <Provider store = {store}>
        <Routing />
      </Provider>
    </MuiThemeProvider>,
  document.getElementById('root'));
registerServiceWorker();
