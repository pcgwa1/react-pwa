import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '../../containers/appBar';
import styled from "styled-components";
import {Link} from "react-router-dom";

const styles = {
  list: {
    width: 300,
  },
};

export const ButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: #333;
  font-size: 28px;
  
  :hover {
    background: #333;
    color: white;
  }
`;

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, user } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ButtonLink to='/events'>Events</ButtonLink>
        </List>
        <Divider />
        <List>
          <ButtonLink to='/about'>About</ButtonLink>
        </List>
      </div>
    );
    return (
      <div>
        <AppBar user={user} openDrawer={this.toggleDrawer('left', true)}/>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
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
