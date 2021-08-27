import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

//Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login user
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      //Save the token to the localstorage
      const { token } = res.data; //const token = res.data.token
      localStorage.setItem('jwtToken', token);

      //Set the token to the auth header
      setAuthToken(token);

      //Decode the token
      const decoded = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const logoutUser = () => (dispatch) => {
  //Remove from localstorage
  localStorage.removeItem('jwtToken');

  //Remove auth header
  setAuthToken(false);

  //Clear out user data from redux store
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
