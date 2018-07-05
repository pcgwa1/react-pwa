import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoutes';
import fire from './firebaseConfig';
import BottomNav from './components/BottomNav';
import Loader from './components/Loader';
import { setUserData } from './actions';

import asyncComponent from './components/AsyncComponent';
export const Landing = asyncComponent(() => import('./containers/Landing'));
export const SignUp = asyncComponent(() => import('./containers/auth/signUp'));
export const ResetPassword = asyncComponent(() => import('./containers/resetPassword'));
export const LogBook = asyncComponent(() => import('./containers/logBook'));
export const Events = asyncComponent(() => import('./containers/Events'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }

  authListener(setUserDataToState){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        setUserDataToState(user.uid);
      } else {
        setUserDataToState(null);
      }
    })

  }

  componentWillMount(){
    const { setUserDataToState } = this.props;
    this.authListener(setUserDataToState);
  }
  render(){
    const { user } = this.props;
    return (
      <Router>
        <div>
          <Loader user={user}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/reset' component={ResetPassword}/>
          <Route exact path='/' component={Landing} />
          <PrivateRoute exact path='/events' component={Events} authenticated={!!user} user={user}/>
          <PrivateRoute exact path='/logbook' component={LogBook} authenticated={!!user} user={user}/>
          {!!user ? <BottomNav user={user} {...this.props} /> : null}
        </div>
      </Router>
    );
  }
}

export function mapStateToProps(state) {
  return {
    user: state.main.user,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    setUserDataToState: data => dispatch(setUserData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);