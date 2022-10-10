import {
  REQUEST_TOKEN,
  GET_QUESTION,
  UPDATE_STATE,
} from '../../helpers/actionTypes';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestUpdateState = () => ({
  type: UPDATE_STATE,
});

const getQuestion = (payload) => ({
  type: GET_QUESTION,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const checkApi = JSON.parse(localStorage.getItem('token'));
  if (checkApi === null) {
    const tokenApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await tokenApi.json();
    localStorage.setItem('token', JSON.stringify(token));
  }
};

export const fetchQuestion = () => async (dispatch) => {
  const checkApi = JSON.parse(localStorage.getItem('token'));
  if (checkApi === null) {
    requestInitialState();
  } else {
    const getQuest = await fetch(`https://opentdb.com/api.php?amount=5&token=${checkApi.token}`);
    const response = await getQuest.json();
    dispatch(getQuestion(response));
  }
};
