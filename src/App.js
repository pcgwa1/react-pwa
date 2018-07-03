import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Home from './Containers/home';
import About from './Containers/about';
import Settings from './Containers/settings';
import logo from './logo.svg';
import './App.css';
import './firebaseConfig';

const Menu = () => (
  <div>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="/about">About</Link>
    </p>
    <p>
      <Link to="/settings">Settings</Link>
    </p>
  </div>
);

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>React PWA</h2>
            </div>
          <Menu />
          <PrivateRoute exact path="/" component={Home} authenticated={true}/>
          <Route exact path="/login" component={About}/>
          <Route exact path="/settings" component={Settings}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;