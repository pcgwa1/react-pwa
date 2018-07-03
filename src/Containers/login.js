import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import fire from '../firebaseConfig';
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(e){
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log('promise response', u.user.uid);
        if(u.user.uid) {
          console.log('push history', this.props);
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }

  signUp(e){
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log('promise response', u.user.uid)
        if(u.user.uid) {
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })

  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
        <form>
          <div>
            <label><b>Username</b></label>
            <input type='email' placeholder='Enter Username' name='email' onChange={this.handleChange} value={this.state.email} required />
            <label><b>Password</b></label>
            <input type='password' placeholder='Enter Password' name='password' onChange={this.handleChange} value={this.state.password} required />
            <button type='button' onClick={this.login}>Login</button>
            <button type='button' onClick={this.signUp}>Sign up</button>
          </div>
          <Link to='/reset'>Reset Password</Link>
        </form>
    );
  }
}

export default Login;
