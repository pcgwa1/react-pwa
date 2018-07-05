import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import fire from "../../firebaseConfig";

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    bottom: 0,
    position: 'fixed',
    padding: 5,
    backgroundColor: '#EDE7F6',
  },
  icon: {
    margin: 5,
  },
  iconHover: {
    margin: 5,
    '&:hover': {
      color: 'blue',
    },
  },
};

export const ButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: #333;
  cursor: pointer;
`;

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  position: fixed;
  padding: 0 10px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  background-color: #EDE7F6;
  color: white;
  text-align: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
  color: #333;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Label = styled.label`
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
`;

function logout() {
  fire.auth().signOut();
}

class SimpleBottomNavigation extends Component {
  render() {
    return (
      <NavBar>
        <ButtonLink to='/logbook'>
          <Label>Logbook</Label>
        </ButtonLink>
        <ButtonLink to='/'>
          <Label>Dash</Label>
        </ButtonLink>
        <Button color='inherit' onClick={() => logout()}>Log Out</Button>
      </NavBar>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
