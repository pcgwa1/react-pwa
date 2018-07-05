import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import fire from '../firebaseConfig';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export const ButtonLink = styled(Link)`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: white;
`;

function logout() {
  fire.auth().signOut();
}

function ButtonAppBar(props) {
  const { classes, user, openDrawer } = props;
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          {!!user ?
          <IconButton onClick={() => openDrawer()} className={classes.menuButton} color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton> : null }
          <Typography variant='title' color='inherit' className={classes.flex}>
            PWA
          </Typography>
          {!!user ? <Button color='inherit' onClick={() => logout()}>Log Out</Button> :
            <div>
              <Button color='inherit'><ButtonLink to='/signup'>Sign Up</ButtonLink></Button>
              <Button color='inherit'><ButtonLink to='/login'>Log In</ButtonLink></Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
