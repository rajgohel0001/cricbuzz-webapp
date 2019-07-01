import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import player from './player';
import login from './login';
import score from './score';
import home from './home';


ReactDOM.render(
  <Router>
  <Switch>
  <Route exact path='/' component={login} />
  <Route path='home' component={home} />
  <Route path='login' component={Login} />
  <Route path='player' component={player} />
  <Route path='score/:id' component={score} />
  <Route path='player/:pid' component={player} />
  </Switch>
  </Router>,
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
