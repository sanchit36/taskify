import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Spinner from './components/Spinner';
import { UserContext } from './context/User';
import { auth } from './firebase';
import Auth from './screens/Auth';
import Main from './screens/Main';
import NotFound from './screens/NotFound';

const App: React.FC = () => {
  const { isLoggedIn, loginUser, logoutUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loginUser({
          id: user.uid,
          avatar: user.photoURL,
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        logoutUser();
      }

      setLoading(false);
    });
  }, [loginUser, logoutUser]);

  return (
    <React.Fragment>
      <div className='App'>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path='/'
              element={isLoggedIn ? <Main /> : <Navigate to='/auth' />}
            />
            <Route
              path='/auth'
              element={!isLoggedIn ? <Auth /> : <Navigate to='/' />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
