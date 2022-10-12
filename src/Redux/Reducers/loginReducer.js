import { INPUT_NAME, INPUT_EMAIL } from '../../helpersAction/actionTypes';

const INITIAL_STATE = { name: '', email: '' };

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_NAME:
    return { ...state, name: action.value };
  case INPUT_EMAIL:
    return { ...state, email: action.value };
  default:
    return state;
  }
};

export default loginReducer;
