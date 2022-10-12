import {
  SEND_SCORE,
  UPDATE_NAME,
  UPDATE_EMAIL,
  ASSERTIONS,
} from '../../helpersAction/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_SCORE:
    return { ...state, score: action.value };
  case UPDATE_EMAIL:
    return { ...state, gravatarEmail: action.value };
  case UPDATE_NAME:
    return { ...state, name: action.value };
  case ASSERTIONS:
    return { ...state, assertions: action.value };
  default:
    return state;
  }
};

export default player;
