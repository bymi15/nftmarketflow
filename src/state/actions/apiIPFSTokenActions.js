export function getIPFSTokenAction(dispatch, token) {
  dispatch({
    payload: token,
    type: 'API_GET_IPFS_TOKEN',
  });
}
