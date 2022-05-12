export function getIPFSAPIKeyAction(dispatch, key) {
  dispatch({
    payload: key,
    type: 'API_GET_IPFS_API_KEY',
  });
}
