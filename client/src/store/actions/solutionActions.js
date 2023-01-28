import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_SOLUTIONS_LOADING,
  GET_SOLUTIONS_SUCCESS,
  GET_SOLUTIONS_FAIL,
  ADD_SOLUTION_LOADING,
  ADD_SOLUTION_SUCCESS,
  ADD_SOLUTION_FAIL,
  DELETE_SOLUTION_LOADING,
  DELETE_SOLUTION_SUCCESS,
  DELETE_SOLUTION_FAIL,
  EDIT_SOLUTION_LOADING,
  EDIT_SOLUTION_SUCCESS,
  EDIT_SOLUTION_FAIL,
  CLEAR_SOLUTION_ERROR,
} from '../types';
import { toast } from 'react-hot-toast';

export const getSolutions = () => async (dispatch, getState) => {
  dispatch({
    type: GET_SOLUTIONS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('http://localhost:80/api/solutions', options);
    dispatch({
      type: GET_SOLUTIONS_SUCCESS,
      payload: { solutions: response.data.messages},
    });
  } catch (err) {
    dispatch({
      type: GET_SOLUTIONS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const winnerSolutions = (message) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SOLUTION_LOADING,
    payload: {me: { ...getState().auth.me} },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('http://localhost:80/api/solutions', options);
    const filteredData = response.data.messages.filter(e => e.message === message && e.selected)
    dispatch({
      type: GET_SOLUTIONS_SUCCESS,
      payload: { solutions:  filteredData},
    })
  }
  catch(err){
    dispatch({
      type: GET_SOLUTIONS_FAIL,
      payload: {error: err?.response?.data?.message || err.message}
    })
  }
}

export const addSolution = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SOLUTION_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('http://localhost:80/api/solutions', formData, options);

    dispatch({
      type: ADD_SOLUTION_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (err) {
    dispatch({
      type: ADD_SOLUTION_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteSolution = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_SOLUTION_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`http://localhost:80/api/solutions/${id}`, options);

    dispatch({
      type: DELETE_SOLUTION_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (err) {
    dispatch({
      type: DELETE_SOLUTION_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editSolution = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_SOLUTION_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`http://localhost:80/api/solutions/${id}`, formData, options);

    dispatch({
      type: EDIT_SOLUTION_SUCCESS,
      payload: { message: response.data.message },
    });
    toast.success('Successfully created!');
  } catch (err) {
    dispatch({
      type: EDIT_SOLUTION_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

export const clearSolutionError = (id) => ({
  type: CLEAR_SOLUTION_ERROR,
  payload: { id },
});
