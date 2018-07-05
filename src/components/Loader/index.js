import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import Paper from '@material-ui/core/Paper';
import fire from '../../firebaseConfig';
import TextFields from '../../components/TextField/index';
import FlatButton from '../../components/Buttons/FlatPlain';
import PageContainer from '../../components/PageContainer';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from "prop-types";


const Overlay = styled.div`
  position: fixed;
  display: ${props => (props.isLoading ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255, 1);
  z-index: 999;
  color: white;
  overflow: hidden;
`;

const Spin = keyframes`
  from {transform:rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  position: relative;
  &:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #ccc;
      border-top-color: #D81E05;
      animation: ${Spin} .5s linear infinite;
    }
`;

export const Form = styled.form`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const LinkWrapper = styled(Link)`
    margin: 16px 0;
    font-weight: bold;
    text-decoration: none;
`;

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 500,
      loading: true,
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.isLoading) {
        this.setState({ number: this.state.number + 500 });
      } else {
        this.setState({ loading: false });
        clearInterval(this.interval);
      }
    }, 500);
  }

  login(e){
    e.preventDefault();
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

  handleChange(e){
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <Overlay isLoading={!this.props.user}>
        <PageContainer>
          <Paper className={classes.paper}>
            <Form>
              <TextFields name='email' label='Enter your email address' type='email' onChangeHandler={this.handleChange} value={this.state.email} />
              <TextFields name='password' label='Enter password' type='password' onChangeHandler={this.handleChange} value={this.state.password} />
              <FlatButton name='Login' type='button' handleClick={this.login} />
              <LinkWrapper to='/reset'>Reset Password</LinkWrapper>
            </Form>
          </Paper>
        </PageContainer>
        {/*<Spinner />*/}
      </Overlay>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);