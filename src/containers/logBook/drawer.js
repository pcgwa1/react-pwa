import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextFields from '../../components/TextField/index';
import FlatButton from '../../components/Buttons/FlatPlain';
import styled from "styled-components";
import { db } from '../../firebaseConfig';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    top: 0,
  },
};

export const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70vh;
`;

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: '',
      suggestion: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //step 1: create the reference
    const newSuggestionReference = db.collection('suggestions').doc();
    //step 2: update the reference with the data
    newSuggestionReference.set({
      name: this.state.event,
      id: newSuggestionReference.id });
    console.log('Yaaay: ');
    this.toggleDrawer('bottom', false);
  };

  handleChange(e){
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.toggleDrawer('bottom', true)}>Add Log</Button>
        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
          className={classes.drawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', true)}
            onKeyDown={this.toggleDrawer('bottom', true)}
          >
            <Form>
              <form>
                <TextFields name='event' label='Enter log' type='text' onChangeHandler={this.handleChange} value={this.state.email} />
                <FlatButton name='Save Log' type='button' handleClick={this.handleSubmit} />
              </form>
            </Form>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
