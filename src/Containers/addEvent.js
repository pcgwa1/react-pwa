import React, { PureComponent } from 'react';
import { db } from '../firebaseConfig';

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      event: '',
      suggestion: null,
    };
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  submitData(e){
    e.preventDefault();
    db.doc('events/event-type')
      .set({name: this.state.event})
      .then(() => {
        console.log('Successfully submitted ');
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    //step 1: create the reference
    const newSuggestionReference = db.collection('suggestions').doc()
    //step 2: update the reference with the data
    newSuggestionReference.set({
      name: this.state.event,
      id: newSuggestionReference.id })
  };

  handleChange(e){
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    db.doc('events/event-type')
      .onSnapshot((doc) => {
        if(doc.data()){
          this.setState({ name: doc.data().name })
        }

      });

    db.collection("suggestions")
      .onSnapshot((collection) => {
          const suggestions = collection.docs.map(doc => doc.data());
          this.setState({suggestions});
      });
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label><b>Event Name</b></label>
            <input type='text' placeholder='Event name' name='event' onChange={this.handleChange} value={this.state.event} required />
            <button type='button' onClick={this.handleSubmit}>Save Suggestions</button>
            <button type='button' onClick={this.submitData}>Save Event</button>
          </div>
          {this.state.name}
        </form>
        <ul>
          {this.state.suggestions &&
          this.state.suggestions.map((topic, index) =>
            <li key={index}>
              {topic.name}
              <button onClick={ ( ) =>
                db
                  .collection('suggestions')
                  .doc(topic.id)
                  .delete( )} >
                Delete Me
              </button>
              </li>
          )
          }
        </ul>
      </div>
    );
  }
}

export default ResetPassword;
