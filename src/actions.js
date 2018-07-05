import {
  DEFAULT,
  SET_USER_DATA,
} from './constants';

export function defaultReducer() {
  return { type: DEFAULT };
}

export function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}