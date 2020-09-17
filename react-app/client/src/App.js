import React, { useState } from 'react';
import './App.css';
import Nav from './components/nav/nav';
import About from './components/about/about';
import Home from './components/home/home';
import FindPath from './components/find-path/find-path';
import Profile from './components/profile/profile';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './auth';
import PrivateRoute from './privateroute';
import Login from './components/login/login';
import SignUp from './components/sign-up/signup';
import fapp from "./base";


function App() {
	var [loggedIn, setloggedIn] = useState(null);
	var [loggedOut, setloggedOut] = useState(null);

	fapp.auth().onAuthStateChanged(user => {
		if (user){
			setloggedIn(loggedIn = true);
			setloggedOut(loggedOut = false);
		} else {
			setloggedIn(loggedIn = false);
			setloggedOut(loggedOut = true);
		}
	})
	
	return (
		<AuthProvider>
			<Router>
				<div>
					<Nav loggedin = {loggedIn} loggedout = {loggedOut} />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/ref" exact component={Home} />
						<Route path="/about" exact component={About} />
						<Route path="/findpath" exact component={FindPath} />
						<PrivateRoute path="/profile" exact component={Profile} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
