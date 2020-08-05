import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import About from './components/about/about';
import Home from './components/home/home';
import Find_path from './components/find_path/find_path';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/findpath" exact component={Find_path} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
