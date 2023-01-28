import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import { GET_USERS_LOADING, GET_USERS_SUCCESS, GET_USERS_FAIL, EDIT_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_LOADING } from '../types';

export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: GET_USERS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('http://localhost:80/api/users', options);

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: { users: response.data.users },
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: err.message,
    });
  }
};

export const updateUserPreferences = (id, formData) => async (dispatch, getState) => {
  console.log('step two', formData)
  dispatch({
    type: EDIT_USER_LOADING,
  });
  try{
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`http://localhost:80/api/update/${id}`,formData, options);

    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: { user: response.data.user }
    })
  }
  catch (err) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
}
