import * as fcl from '@onflow/fcl';
import setupUserCadence from 'cadence/transactions/SetupUser.cdc';
import { initCollectionAction } from 'state/actions/collectionActions';
import { setLoadingAction } from 'state/actions/loadingActions';

export const setupUser = async (dispatch) => {
  setLoadingAction(dispatch, true, 'Setting up collection...');
  const setupUserCodeText = await (await fetch(setupUserCadence)).text();
  const transaction = await fcl.send([
    fcl.transaction(setupUserCodeText),
    fcl.args([]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);

  let txId = await fcl.decode(transaction);
  await fcl.tx(txId).onceSealed();
  setLoadingAction(dispatch, false, '');
  initCollectionAction(dispatch);
  return txId;
};
