import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_MESSAGES_LOADING,
  GET_MESSAGES_SUCCESS,
  GET_SINGLEMESSAGE_SUCCESS,
  GET_MESSAGES_FAIL,
  ADD_MESSAGE_LOADING,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAIL,
  DELETE_MESSAGE_LOADING,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  EDIT_MESSAGE_LOADING,
  EDIT_MESSAGE_SUCCESS,
  EDIT_MESSAGE_FAIL,
  CLEAR_MESSAGE_ERROR,
} from '../types';
import { toast } from 'react-hot-toast';

export const getMessages = () => async (dispatch, getState) => {
  dispatch({
    type: GET_MESSAGES_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('http://localhost:80/api/messages', options);

    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: { messages: response.data.messages },
    });
  } catch (err) {
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getSingleMessage = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_MESSAGES_LOADING,
  });
  try{
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`http://localhost:80/api/messages/${id}`, options);
    dispatch({
      type: GET_SINGLEMESSAGE_SUCCESS,
      payload: { messages: response.data.message }
    })
  }
  catch(err){
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: { error: err?.response?.data.message }
    })
  }
}

export const addMessage = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_MESSAGE_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('http://localhost:80/api/messages', formData, options);

    dispatch({
      type: ADD_MESSAGE_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (err) {
    dispatch({
      type: ADD_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteMessage = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_MESSAGE_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`http://localhost:80/api/messages/${id}`, options);
    dispatch({
      type: DELETE_MESSAGE_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (err) {
    dispatch({
      type: DELETE_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editMessage = (id, formData) => async (dispatch, getState) => {
  console.log('this got triggered')
  dispatch({
    type: EDIT_MESSAGE_LOADING,
    payload: { id },
  });
  try {
    console.log(formData, 'in edir')
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`http://localhost:80/api/messages/${id}`, formData, options);

    dispatch({
      type: EDIT_MESSAGE_SUCCESS,
      payload: { message: response.data.message },
    });
    toast.success('Successfully created!');
  } catch (err) {
    dispatch({
      type: EDIT_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

export const clearMessageError = (id) => ({
  type: CLEAR_MESSAGE_ERROR,
  payload: { id },
});
