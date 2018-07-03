import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Login from './Containers/login';
import Home from './Containers/home';
import About from './Containers/about';
import Settings from './Containers/settings';
import logo from './logo.svg';
import './App.css';
import fire from './firebaseConfig';

function logout() {
  fire.auth().signOut();
}
const Menu = (props) => (
  <div>
    <p>
      <Link to='/home'>Home</Link>
    </p>
    <p>
      <Link to='/about'>About</Link>
    </p>
    <p>
      <Link to='/settings'>Settings</Link>
    </p>
    {props.authenticated ? <button type='button' onClick={() => logout()}> Logout</button> : null}
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user: user.uid});
      } else {
        this.setState({user: null});
      }
    })

  }

  componentWillMount(){
    this.authListener();
  }
  render(){
    const { user } = this.state;
    console.log('App routes');
    console.log('authenticated', !!user);
    return (
      <Router>
        <div>
          <div className='App'>
            <div className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <h2>React PWA</h2>
            </div>
            {!!user ? <Menu authenticated={!!user} /> : null}
          <Route exact path='/login' component={Login}/>
          <PrivateRoute exact path='/' component={Home} authenticated={!!user}/>
          <PrivateRoute exact path='/about' component={About} authenticated={!!user}/>
          <PrivateRoute exact path='/settings' component={Settings} authenticated={!!user}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;