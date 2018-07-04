import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fire from '../../firebaseConfig';
import TextFields from '../../components/TextField/index';
import FlatButton from '../../components/Buttons/FlatPlain';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 5px solid green;
  
  a {
    margin: 12px 0;
    font-weight: bold;
    text-decoration: none;
  }
`;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(e){
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log('promise response success', u.user.uid);
        if(u.user.uid) {
          this.setState({user: u.user.uid});
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      })
  }

  componentWillUpdate(){
    if(this.state.user){
      this.props.history.push('/');
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
        <form>
          <Wrapper>
            <TextFields name='email' label='Enter your email address' type='email' onChangeHandler={this.handleChange} value={this.state.email} />
            <TextFields name='password' label='Enter password' type='password' onChangeHandler={this.handleChange} value={this.state.password} />
            <FlatButton name='Login' type='button' handleClick={this.login} />
            <Link to='/reset'>Reset Password</Link>
          </Wrapper>
        </form>
    );
  }
}

export default Login;
