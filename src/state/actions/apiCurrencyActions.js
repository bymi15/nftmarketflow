export function getCurrencyAction(dispatch, data) {
  dispatch({
    payload: data,
    type: 'API_GET_CURRENCY',
  });
}
