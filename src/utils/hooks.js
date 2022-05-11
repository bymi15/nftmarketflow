import { useReducer } from 'react';

export const useNestedState = (defaultState) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  return useReducer(reducer, defaultState);
};

export const handleInputChange = (e, setState) => {
  const { name, value } = e.target;
  setState({ [name]: value });
};
