import {
  errorSaleItemsAction,
  getSaleItemsAction,
  removeSaleItemAction,
  upsertSaleItemAction,
} from 'state/actions/apiSaleItemsActions';
import { callDelete, callGet, callPut } from './request';

export const getSaleItems = async (dispatch) => {
  const { data, err } = await callGet('/saleItems');
  if (data && !err) {
    getSaleItemsAction(dispatch, data);
  } else {
    errorSaleItemsAction(dispatch, err);
  }
};

export const upsertSaleItem = async (dispatch, item) => {
  const { data, err } = await callPut('/saleItems', item);
  if (data && !err) {
    upsertSaleItemAction(dispatch, data);
  } else {
    errorSaleItemsAction(dispatch, err);
    throw err;
  }
};

export const removeSaleItem = async (dispatch, id) => {
  const { err } = await callDelete(`/saleItems/${id}`);
  if (!err) {
    removeSaleItemAction(dispatch, id);
  } else {
    errorSaleItemsAction(dispatch, err);
    throw err;
  }
};
