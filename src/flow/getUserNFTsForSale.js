import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import getUserNFTsForSaleCadence from 'cadence/scripts/GetUserNFTsForSale.cdc';
import { setLoadingAction } from 'state/actions/loadingActions';
import { setSalesCollectionAction } from 'state/actions/salesCollectionActions';

export const getUserNFTsForSale = async (dispatch, addr) => {
  if (addr) {
    setLoadingAction(dispatch, true, 'Fetching sales collection...');
    const getUserNFTsForSaleCodeText = await (await fetch(getUserNFTsForSaleCadence)).text();
    const script = await fcl.send([
      fcl.script(getUserNFTsForSaleCodeText),
      fcl.args([fcl.arg(addr, t.Address)]),
    ]);
    const res = await fcl.decode(script);
    setLoadingAction(dispatch, false, '');
    setSalesCollectionAction(dispatch, res);
    return res;
  }
};
