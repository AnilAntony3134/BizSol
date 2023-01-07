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
  
  const initialState = {
    solutions: [],
    isLoading: false,
    error: null,
  };
  
  // You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case GET_SOLUTIONS_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case ADD_SOLUTION_LOADING:
        return {
          ...state,
          solutions: [
            {
              id: 0,
              text: 'Loading...',
              isLoading: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              user: { ...payload.me },
            },
            ...state.solutions,
          ],
        };
      case DELETE_SOLUTION_LOADING:
      case EDIT_SOLUTION_LOADING:
        return {
          ...state,
          solutions: state.solutions.map((m) => {
            if (m.id === payload.id) return { ...m, isLoading: true };
            return m;
          }),
        };
      case GET_SOLUTIONS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          solutions: payload.solutions,
        };
      case ADD_SOLUTION_SUCCESS:
        return {
          ...state,
          solutions: state.solutions.map((m) => {
            if (m.id === 0) return payload.message;
            return m;
          }),
        };
      case DELETE_SOLUTION_SUCCESS:
        return {
          ...state,
          solutions: state.solutions.filter((m) => m.id !== payload.message.id),
        };
      case EDIT_SOLUTION_SUCCESS:
        return {
          ...state,
          solutions: state.solutions.map((m) => {
            if (m.id === payload.message.id) return payload.message;
            return m;
          }),
        };
      case DELETE_SOLUTION_FAIL:
      case EDIT_SOLUTION_FAIL:
        return {
          ...state,
          error: null,
          solutions: state.solutions.map((m) => {
            if (m.id === payload.id) return { ...m, isLoading: false, error: payload.error };
            return m;
          }),
        };
      case GET_SOLUTIONS_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
        };
      case ADD_SOLUTION_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
          solutions: state.solutions.filter((m) => m.id !== 0),
        };
      case CLEAR_SOLUTION_ERROR:
        return {
          ...state,
          solutions: state.solutions.map((m) => {
            if (m.id === payload.id) return { ...m, isLoading: false, error: null };
            return m;
          }),
        };
      default:
        return state;
    }
  }
  