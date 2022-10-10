import {
  REQUEST_TOKEN,
  GET_QUESTION,
  UPDATE_STATE,
} from '../../helpers/actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  allQuestions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, isLoading: true };
  case GET_QUESTION:
    return { ...state,
      allQuestions: action.payload,
      isLoading: true };
  case UPDATE_STATE:
    return { ...state, isLoading: false };
  default:
    return state;
  }
};

export default gameReducer;
