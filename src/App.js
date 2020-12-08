import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './components/DashBoard';
import Home from './components/Home';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import facade from './apiFacade';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = facade.getUser();
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/404">
          <NoMatch />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
}
export default App;

function NoMatch() {
  return (
    <div>
      <h2>Page not found</h2>
    </div>
  );
}
