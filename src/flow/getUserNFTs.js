import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import getUserNFTsCadence from 'cadence/scripts/GetUserNFTs.cdc';
import { setCollectionAction } from 'state/actions/collectionActions';
import { setLoadingAction } from 'state/actions/loadingActions';

export const getUserNFTs = async (dispatch, addr) => {
  setLoadingAction(dispatch, true, 'Fetching collection...');
  const getUserNFTsCodeText = await (await fetch(getUserNFTsCadence)).text();
  const script = await fcl.send([
    fcl.script(getUserNFTsCodeText),
    fcl.args([fcl.arg(addr, t.Address)]),
  ]);
  const res = await fcl.decode(script);
  setLoadingAction(dispatch, false, '');
  setCollectionAction(dispatch, res);
  return res;
};
