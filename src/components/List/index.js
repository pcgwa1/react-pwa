import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from "../../firebaseConfig";
import styled from "styled-components";

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});
export const Button = styled.button`
  padding: 0;
  margin: 0 10%;
  background: none;
  outline: none;
  border: none;
  
  :hover {
    cursor: pointer;
  }
`;
class CheckboxList extends Component {
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, suggestions } = this.props;
    return (
      <div className={classes.root}>
        <List>
          {suggestions.map((topic, index) => {
            return (
              <ListItem
                key={topic.id}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(topic.id)}
                className={classes.listItem}
              >
                <Checkbox
                  checked={this.state.checked.indexOf(topic.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={topic.name} />
                <Button
                  type='button'
                  onClick={() =>
                    db.collection('suggestions')
                      .doc(topic.id)
                      .delete( )}
                >
                  <DeleteIcon className={classes.icon} />
                </Button>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
