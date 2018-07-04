import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextFields from '../components/TextField/index';
import FlatButton from '../components/Buttons/FlatPlain';
import Table from '../components/Table';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export const Wrapper = styled.div`
  padding: 0;
  margin: 16px 10%;
`;

class Events extends Component {
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
    const newSuggestionReference = db.collection('suggestions').doc();
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
      .orderBy("name")
      .onSnapshot((collection) => {
        const suggestions = collection.docs.map(doc => doc.data());
        this.setState({suggestions});
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <Wrapper>
        <form>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <TextFields name='event' label='Enter name or suggestion' type='text' onChangeHandler={this.handleChange} value={this.state.email} />
                  <FlatButton name='Save Name' type='button' handleClick={this.submitData} />
                  <FlatButton name='Save Suggestion' type='button' handleClick={this.handleSubmit} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <h4>Event names</h4>
                  {this.state.name}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                {this.state.suggestions && <Table suggestions={this.state.suggestions}/>}
              </Grid>
            </Grid>
          </div>
        </form>
      </Wrapper>
    );
  }
}
Events.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);
