import React, { Component }  from 'react';
import { HashRouter,Link,Route } from 'react-router-dom';
import player from './player.js';
import login from './login.js';
import score from './score.js';
import home from './home.js';

const propService = {
	getprop(prop){
		console.log("service works");
		console.log("props",prop);
		console.log("window location:",window.location);
		console.log("path name:",prop.location.pathname);

		if(prop.match.url == "/"){
			console.log("login page called");
			if(localStorage.getItem('email')){
				console.log("email:",localStorage.getItem('email'));
				// if(prop.location.pathname == "/home"){
				// 	return(
				// 		console.log("home page"),
				// 		<div>
				// 		<HashRouter>					
				// 		<Route path = "/home" component = {home}></Route>
				// 		</HashRouter>
				// 		</div>
				// 	)
				// }
				// if(prop.location.pathname == "/player"){
				// 	console.log("player page");
				// 	return(
				// 		console.log("player page"),
				// 		<div>
				// 		<HashRouter>					
				// 		<Route path = "/player" component = {player}></Route>
				// 		</HashRouter>
				// 		</div>
				// 	)
				// }
				return(
						console.log("home page call 1"),
						// location.replace("localhost:3000/#/home"),
						<div>
						<HashRouter>					
						<Route path = "/home" component = {home} />
						</HashRouter>
						</div>,						
						console.log("home page call 2")
					)
			}
			else{
				return(
					<div>
					<HashRouter>					
					<Route path = "/login" component = {login}></Route>
					</HashRouter>
					</div>
				)
			}
		}
	}
}
export default propService;