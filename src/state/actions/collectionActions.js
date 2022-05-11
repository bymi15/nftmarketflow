export function initCollectionAction(dispatch) {
  dispatch({
    type: 'INIT_COLLECTION',
  });
}

export function setCollectionAction(dispatch, collection) {
  dispatch({
    payload: collection,
    type: 'SET_COLLECTION',
  });
}

export function resetCollectionAction(dispatch) {
  dispatch({
    type: 'RESET_COLLECTION',
  });
}
