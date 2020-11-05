import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProviderfrom from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProviderfrom>
      <Routes />
    </AppProviderfrom>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
