import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
// import { HashRouter,Link,Route } from 'react-router-dom';
import player from './player.js';
import login from './login.js';
import score from './score.js';
import home from './home.js';
import { ProtectedRoute } from "./protected.route";

function App() {
	return (
	  <div className="App">
		<Switch>
				<Route exact path="/" component={login}/>
				<ProtectedRoute exact path="/home" component={home} />
				<ProtectedRoute exact path="/player" component={player} />
				<ProtectedRoute exact path="/score/:mid" component={score} />
				<ProtectedRoute exact path="/player/:pid" component={player} />
				<Route path="*" component={() => 
				<html>
					<h1><center>404 PAGE NOT FOUND</center></h1>
				</html>} />
		</Switch>
	  </div>
	);
  }

ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	 document.getElementById('root')
	 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
