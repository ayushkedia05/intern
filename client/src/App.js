import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthenticationImage } from './components/login/login';
import Register from './components/login/register';

import Display from './components/pages/display';

function App() {












  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Register} />
         
          <Route path='/sign-up' component={AuthenticationImage} />
          <Route path='/sign' component={Display} />
          
          
           
  

        </Switch>
      </Router>
    </>
  );
}

export default App;
