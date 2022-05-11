export function setSalesCollectionAction(dispatch, collection) {
  dispatch({
    payload: collection,
    type: 'SET_SALES_COLLECTION',
  });
}

export function resetSalesCollectionAction(dispatch) {
  dispatch({
    type: 'RESET_SALES_COLLECTION',
  });
}
