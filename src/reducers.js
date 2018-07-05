import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import {
  DEFAULT,
  SET_USER_DATA,
} from './constants';

const initialState = {
  user: null,
};

export function main(
  /* istanbul ignore next */ state = initialState,
  action,
) {
  switch (action.type) {
    case DEFAULT:
      return { ...state};
    case SET_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default function createReducer() {
  return combineReducers({
    form: reduxFormReducer,
    main,
  });
}
