import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { db } from '../../firebaseConfig';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '../../components/List';
import Drawer from './drawer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 38,
    padding: 50,
    color: theme.palette.text.secondary,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
});

export const Wrapper = styled.div`
  padding: 0;
    @media (min-width:600px)  {
      margin: 16px 10%;
    }
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
                <Typography  variant="display2" className={classes.title} >
                  Logbook
                </Typography>
                <Drawer/>
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
