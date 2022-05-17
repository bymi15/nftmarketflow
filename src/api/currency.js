import { getCurrencyAction } from 'state/actions/apiCurrencyActions';
import { callGet } from './request';

export const getCurrency = async (dispatch, symbol = 'FLOW') => {
  const { data, err } = await callGet(`/currency?symbol=${symbol}`);
  if (data && !err) {
    getCurrencyAction(dispatch, data);
  }
};
