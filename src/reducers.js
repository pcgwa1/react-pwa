import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import {
  DEFAULT,
} from './constants';

const initialState = {
  someValue: false,
};

export function main(
  /* istanbul ignore next */ state = initialState,
  action,
) {
  switch (action.type) {
    case DEFAULT:
      return { ...state};
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
