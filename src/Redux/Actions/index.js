import {
  REQUEST_TOKEN,
  GET_QUESTION,
  UPDATE_STATE,
  TIME_OUT,
  INPUT_NAME,
  INPUT_EMAIL,
  SEND_SCORE,
  UPDATE_EMAIL,
  UPDATE_NAME,
  ASSERTIONS,
} from '../../helpersAction/actionTypes';

export const timeOut = () => ({
  type: TIME_OUT,
});

export const assertions = (value) => ({
  type: ASSERTIONS,
  value,
});

export const sendName = (value) => ({
  type: UPDATE_NAME,
  value,
});

export const sendEmail = (value) => ({
  type: UPDATE_EMAIL,
  value,
});

export const sendScore = (value) => ({
  type: SEND_SCORE,
  value,
});

export const inputEmail = (value) => ({
  type: INPUT_EMAIL,
  value,
});

export const inputName = (value) => ({
  type: INPUT_NAME,
  value,
});

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
  const checkApi = localStorage.getItem('token');
  if (checkApi === null) {
    requestInitialState();
  } else {
    const getQuest = await fetch(`https://opentdb.com/api.php?amount=5&token=${checkApi}`);
    const response = await getQuest.json();
    dispatch(getQuestion(response));
  }
};
