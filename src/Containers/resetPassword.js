import React, { PureComponent } from 'react';
import fire from '../firebaseConfig';

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  reset(e){
    fire.auth().sendPasswordResetEmail(this.state.email)
      .then((response) => {
        console.log('promise response', response);
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
            <button type='button' onClick={this.reset}>Reset Password</button>
          </div>
        </form>
    );
  }
}

export default ResetPassword;
