import { getIPFSAPIKeyAction } from 'state/actions/apiKeysActions';
import { callGet } from './request';

export const getIPFSAPIKey = async (dispatch) => {
  const { data, err } = await callGet('/apiKeys/ipfs');
  if (data && !err) {
    getIPFSAPIKeyAction(dispatch, data?.key);
  }
};
