import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
});

export const TextInput = styled(TextField)`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const TextFieldMargins = props => {
  const { classes,
    name,
    label,
    type,
    onChangeHandler,
    value } = props;
  return (
    <div className={classes.container}>
      <TextField
        name={name}
        label={label}
        className={classes.textField}
        helperText=''
        margin='normal'
        type={type}
        onChange={onChangeHandler}
        value={value}
      />
    </div>
  );
};

TextFieldMargins.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldMargins);
