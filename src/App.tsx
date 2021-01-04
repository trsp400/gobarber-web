import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';

import ContextProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes />
      </ContextProvider>

      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
