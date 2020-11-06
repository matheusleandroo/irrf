import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProviderfrom from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Router>
    <AppProviderfrom>
      <Routes />
    </AppProviderfrom>

    <GlobalStyle />
  </Router>
);

export default App;
