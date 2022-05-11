export function setLoadingAction(dispatch, status, text) {
  dispatch({
    payload: { status, text },
    type: 'SET_LOADING',
  });
}
