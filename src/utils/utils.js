import { removeSaleItem } from 'api/saleItems';
import { getSaleItemRemovedEvent } from 'flow/events';
import { unlistNFTFromSale } from 'flow/unlistNFTFromSale';
import { toast } from 'react-toastify';
import { setLoadingAction } from 'state/actions/loadingActions';

export const constructSaleItemDoc = (nft, saleItemEvent, userAddr) => ({
  nftID: saleItemEvent.id,
  price: saleItemEvent.price,
  metadata: nft.metadata,
  ipfsHash: nft.ipfsHash,
  uuid: nft.uuid,
  listedBy: userAddr,
});

export const handleRemoveFromSale = async (dispatch, item) => {
  try {
    await unlistNFTFromSale(item.nftID, dispatch);
    const event = await getSaleItemRemovedEvent();
    console.log(event);
    setLoadingAction(dispatch, true, 'Updating database...');
    await removeSaleItem(dispatch, item._id);
  } catch (err) {
    console.log(err);
    toast.error(`Error while removing NFT from sale. Please try again.`);
  }
  setLoadingAction(dispatch, false, '');
};
