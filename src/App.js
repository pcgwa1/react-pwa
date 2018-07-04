import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import './App.css';
import fire from './firebaseConfig';

import asyncComponent from './components/AsyncComponent';
export const Home = asyncComponent(() => import('./containers/home'));
export const Login = asyncComponent(() => import('./containers/auth/login'));
export const SignUp = asyncComponent(() => import('./containers/auth/signUp'));
export const ResetPassword = asyncComponent(() => import('./containers/resetPassword'));
export const AppBar = asyncComponent(() => import('./containers/appBar'));
export const About = asyncComponent(() => import('./containers/about'));
export const Events = asyncComponent(() => import('./containers/Events'));

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