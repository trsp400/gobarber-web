import React from 'react';
import GlobalStyles from './styles/global';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
