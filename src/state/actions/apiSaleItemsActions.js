export function getSaleItemsAction(dispatch, items) {
  dispatch({
    payload: items,
    type: 'API_GET_SALE_ITEMS',
  });
}

export function upsertSaleItemAction(dispatch, item) {
  dispatch({
    payload: item,
    type: 'API_UPSERT_SALE_ITEM',
  });
}

export function removeSaleItemAction(dispatch, id) {
  dispatch({
    payload: id,
    type: 'API_REMOVE_SALE_ITEM',
  });
}

export function errorSaleItemsAction(dispatch, err) {
  dispatch({
    payload: err,
    type: 'API_ERROR_SALE_ITEMS',
  });
}
