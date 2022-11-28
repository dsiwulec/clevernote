import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SplashPage from './components/SplashPage/SplashPage';
import HomePage from './components/HomePage/HomePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path='/notes' exact={true}>
          {/* <NotesPage /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/notebooks' exact={true}>
          {/* <NotebooksPage /> */}
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {user ?
            <HomePage /> :
            <SplashPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
