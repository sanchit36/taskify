import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Spinner from './components/Spinner';
import { UserContext } from './context/User';
import Auth from './screens/Auth';
import Main from './screens/Main';
import NotFound from './screens/NotFound';

const App: React.FC = () => {
  const { isLoggedIn, loading } = useContext(UserContext);

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
