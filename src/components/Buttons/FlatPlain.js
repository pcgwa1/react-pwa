import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function ButtonSizes(props) {
  const {
    classes,
    name,
    type,
    handleClick,
  } = props;
  return (
    <div>
      <div>
        <Button
          type={type}
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          {name}
        </Button>
      </div>
    </div>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);
