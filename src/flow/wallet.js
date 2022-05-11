import * as fcl from '@onflow/fcl';
import { loginUserAction } from 'state/actions/userActions';

export const loginWallet = (dispatch) => {
  fcl.authenticate();
  fcl.currentUser.subscribe((walletAuthUser) => {
    if (walletAuthUser?.loggedIn) {
      loginUserAction(dispatch, walletAuthUser);
    }
  });
};

export const subscribeUser = (dispatch) => {
  fcl.currentUser.subscribe((walletAuthUser) => {
    if (walletAuthUser?.loggedIn) {
      loginUserAction(dispatch, walletAuthUser);
    }
  });
};

export const logoutWallet = () => {
  fcl.unauthenticate();
};
