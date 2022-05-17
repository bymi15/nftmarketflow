import {
  errorSaleItemsAction,
  getSaleItemsAction,
  removeSaleItemAction,
  upsertSaleItemAction,
} from 'state/actions/apiSaleItemsActions';
import { callDelete, callGet, callPost, callPut } from './request';

export const getActivities = async (dispatch) => {
  const { data, err } = await callGet('/activities');
  if (data && !err) {
    getSaleItemsAction(dispatch, data);
  } else {
    errorSaleItemsAction(dispatch, err);
  }
};

export const addActivity = async (dispatch, activity) => {
  const { data, err } = await callPost('/activities', activity);
  if (data && !err) {
    upsertSaleItemAction(dispatch, data);
  } else {
    errorSaleItemsAction(dispatch, err);
    throw err;
  }
};
