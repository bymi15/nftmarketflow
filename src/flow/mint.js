import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import mintNFTCadence from 'cadence/transactions/MintNFT.cdc';
import { NFTStorage } from 'nft.storage';
import { setLoadingAction } from 'state/actions/loadingActions';

const uploadToStorage = async (apiKey, metadata) => {
  const client = new NFTStorage({ token: apiKey });
  const cid = await client.storeBlob(
    new File([metadata.image], `${metadata.name}.jpg`, { type: 'image/jpg' })
  );
  return cid;
};

export const mint = async (apiKey, metadata, dispatch) => {
  setLoadingAction(dispatch, true, 'Uploading image to  IPFS storage...');
  let cid = await uploadToStorage(apiKey, metadata);

  const { image, ...metadataRest } = metadata;
  const metadataCadenceDict = Object.keys(metadataRest).map((k) => ({
    key: k,
    value: metadataRest[k],
  }));

  const args = fcl.args([
    fcl.arg(cid, t.String),
    fcl.arg(metadataCadenceDict, t.Dictionary({ key: t.String, value: t.String })),
  ]);

  setLoadingAction(dispatch, true, 'Minting NFT...');
  const mintNFTCodeText = await (await fetch(mintNFTCadence)).text();
  const transaction = await fcl.send([
    fcl.transaction(mintNFTCodeText),
    args,
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
  return cid;
};
