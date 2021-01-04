import React from 'react';
import GlobalStyles from './styles/global';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import ContextProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <ContextProvider>
        <SignIn />
      </ContextProvider>

      <GlobalStyles />
    </>
  );
};

export default App;
