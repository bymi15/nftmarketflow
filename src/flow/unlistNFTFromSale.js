import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import unlistNFTFromSaleCadence from 'cadence/transactions/UnlistNFTFromSale.cdc';
import { setLoadingAction } from 'state/actions/loadingActions';

export const unlistNFTFromSale = async (id, dispatch) => {
  setLoadingAction(dispatch, true, 'Unlisting NFT from sale...');

  const unlistNFTFromSaleCodeText = await (await fetch(unlistNFTFromSaleCadence)).text();
  const transaction = await fcl.send([
    fcl.transaction(unlistNFTFromSaleCodeText),
    fcl.args([fcl.arg(parseInt(id), t.UInt64)]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(9999),
  ]);

  let txId = await fcl.decode(transaction);
  console.log(txId);
  setLoadingAction(dispatch, true, 'Processing transaction...');
  await fcl.tx(txId).onceSealed();
  setLoadingAction(dispatch, false, '');
  return txId;
};
