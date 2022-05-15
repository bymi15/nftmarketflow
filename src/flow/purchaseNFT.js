import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import purchaseNFTCadence from 'cadence/transactions/PurchaseNFT.cdc';
import { setLoadingAction } from 'state/actions/loadingActions';

export const purchaseNFT = async (ownerAddr, nftID, dispatch) => {
  setLoadingAction(dispatch, true, 'Processing purchase...');
  const purchaseNFTCodeText = await (await fetch(purchaseNFTCadence)).text();
  const transaction = await fcl.send([
    fcl.transaction(purchaseNFTCodeText),
    fcl.args([fcl.arg(ownerAddr, t.Address), fcl.arg(parseInt(nftID), t.UInt64)]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);

  let txId = await fcl.decode(transaction);
  await fcl.tx(txId).onceSealed();
  setLoadingAction(dispatch, false, '');
  return txId;
};
