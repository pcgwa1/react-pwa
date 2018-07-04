import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../../firebaseConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from "styled-components";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 0,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  button: {
    margin: 0,
    padding: 0,
    backgroundColor: 'none',
  },
});

export const Button = styled.button`
  padding: 0;
  margin: 0;
  background: none;
  outline: none;
  border: none;
  
  :hover {
    cursor: pointer;
  }
`;
function SimpleTable(props) {
  const { classes, suggestions } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Suggestion</TableCell>
            <TableCell>Remove from Database</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suggestions.map((topic, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {topic.name}
                </TableCell>
                <TableCell>
                  <Button
                    type='button'
                    onClick={() =>
                  db.collection('suggestions')
                    .doc(topic.id)
                    .delete( )}
                  >
                    <DeleteIcon className={classes.icon} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
