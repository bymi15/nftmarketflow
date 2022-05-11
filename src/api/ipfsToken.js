import { getIPFSTokenAction } from 'state/actions/apiIPFSTokenActions';
import { callGet } from './api';

export const getIPFSToken = async (dispatch) => {
  const { data, err } = await callGet('/ipfsToken');
  if (data && !err) {
    getIPFSTokenAction(dispatch, data?.token);
  }
};
