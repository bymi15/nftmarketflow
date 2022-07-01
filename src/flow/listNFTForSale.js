import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import listNFTForSaleCadence from 'cadence/transactions/ListNFTForSale.cdc';
import { setLoadingAction } from 'state/actions/loadingActions';

export const listNFTForSale = async (item, dispatch) => {
  setLoadingAction(dispatch, true, 'Listing NFT for sale...');

  let price = item.price.toString();
  if (!price.includes('.')) {
    price = price + '.0';
  }

  const listNFTForSaleCodeText = await (await fetch(listNFTForSaleCadence)).text();
  const transaction = await fcl.send([
    fcl.transaction(listNFTForSaleCodeText),
    fcl.args([fcl.arg(parseInt(item.id), t.UInt64), fcl.arg(price, t.UFix64)]),
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
