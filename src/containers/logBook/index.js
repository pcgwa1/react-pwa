import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { db } from '../../firebaseConfig';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '../../components/Table';
import List from '../../components/List';

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
      .onSnapshot({ includeMetadataChanges: true }, (collection) => {
        const suggestions = collection.docs.map(doc => doc.data());
        this.setState({suggestions});
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <Wrapper>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {this.state.suggestions && <List suggestions={this.state.suggestions} />}
              </Paper>

              {/*{this.state.suggestions && <Table suggestions={this.state.suggestions}/>}*/}
            </Grid>
          </Grid>
        </div>
      </Wrapper>
    );
  }
}
Events.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);
