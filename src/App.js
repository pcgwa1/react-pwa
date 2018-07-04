import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Login from './Containers/auth/login';
import SignUp from './Containers/auth/signUp';
import ResetPassword from './Containers/resetPassword';
import AppBar from './Containers/appBar';
import Home from './Containers/home';
import About from './Containers/about';
import Events from './Containers/Events';
import './App.css';
import fire from './firebaseConfig';

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
    return (
      <Router>
        <div className='App'>
          <AppBar user={user}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/reset' component={ResetPassword}/>
          <PrivateRoute exact path='/' component={Home} authenticated={!!user} user={user}/>
          <PrivateRoute exact path='/about' component={About} authenticated={!!user} user={user}/>
          <PrivateRoute exact path='/events' component={Events} authenticated={!!user} user={user}/>
        </div>
      </Router>
    );
  }
}

export default App;