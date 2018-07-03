import React, { PureComponent } from 'react';
import { db } from '../firebaseConfig';

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      event: '',
    };
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitData(e){
    e.preventDefault();
    db.doc('events/event-type')
      .set({name: this.state.event})
      .then(response => {
        console.log('response: ', response);
      })
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    db.doc('events/event-type')
      .get()
      .then(doc => {
        this.setState({ name: doc.data().name })
      })
  }
  render() {
    return (
        <form>
          <div>
            <label><b>Event Name</b></label>
            <input type='text' placeholder='Event name' name='event' onChange={this.handleChange} value={this.state.event} required />
            <button type='button' onClick={this.submitData}>Save</button>
          </div>
          {this.state.name}
        </form>
    );
  }
}

export default ResetPassword;
