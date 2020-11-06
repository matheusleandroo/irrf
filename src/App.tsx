import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppProviderfrom from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Router>
    <AppProviderfrom>
      <Routes />
    </AppProviderfrom>

    <GlobalStyle />
    <ToastContainer />
  </Router>
);

export default App;
