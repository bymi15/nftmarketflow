import { removeSaleItem } from 'api/saleItems';
import { getSaleItemRemovedEvent } from 'flow/events';
import { unlistNFTFromSale } from 'flow/unlistNFTFromSale';
import { toast } from 'react-toastify';
import { setLoadingAction } from 'state/actions/loadingActions';
import { MdSell } from 'react-icons/md';
import { FaCloudUploadAlt, FaClipboardList } from 'react-icons/fa';
import palette from 'vui-theme/assets/theme/base/colors';

export const getImageURL = (ipfsHash) => `https://${ipfsHash}.ipfs.nftstorage.link`;

export const roundToTwo = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

export const sortItemsByRecentDate = (items) =>
  items ? items.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) : [];

export const isItemForSale = (collectionItem, salesCollection) => {
  if (salesCollection) {
    for (let c of Object.values(salesCollection)) {
      if (c.nftRef?.id === collectionItem.id) {
        return true;
      }
    }
  }
  return false;
};

export const constructSaleItemDoc = (nft, saleItemEvent, userAddr) => ({
  nftID: saleItemEvent.id,
  price: saleItemEvent.price,
  metadata: nft.metadata,
  ipfsHash: nft.ipfsHash,
  uuid: nft.uuid,
  listedBy: userAddr,
});

export const constructActivityDoc = (eventType, nft, item, userAddr) =>
  eventType === 'LIST'
    ? {
        eventType,
        nftID: item.id,
        nftName: nft.metadata?.name,
        owner: userAddr,
        price: item.price,
        ipfsHash: nft.ipfsHash,
        userAddr,
      }
    : eventType === 'MINT'
    ? {
        eventType,
        nftName: item.name,
        owner: userAddr,
        ipfsHash: item.ipfsHash,
        userAddr,
      }
    : {
        eventType,
        nftID: item.nftID,
        nftName: item.metadata?.name,
        owner: item.listedBy,
        price: item.price,
        ipfsHash: item.ipfsHash,
        userAddr,
      };

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

export const getActivityDescription = (activity, userAddr, withUser = true) => {
  const userDisplay = userAddr === activity.userAddr ? <b>You</b> : <b>{activity.userAddr}</b>;
  switch (activity.eventType) {
    case 'LIST':
      return withUser ? (
        <>
          listed by {userDisplay} for <b>{activity.price} FLOW</b>
        </>
      ) : (
        <>
          was <b>listed</b> for <b>{activity.price} FLOW</b>
        </>
      );
    case 'MINT':
      return withUser ? (
        <>minted by {userDisplay}</>
      ) : (
        <>
          was <b>minted</b>
        </>
      );
    case 'SALE':
      return withUser ? (
        <>
          purchased by {userDisplay} for <b>{activity.price} FLOW</b>
        </>
      ) : (
        <>
          was <b>purchased</b> for <b>{activity.price} FLOW</b>
        </>
      );
    default:
      return '';
  }
};

export const getActivityIcon = (activity) => {
  switch (activity.eventType) {
    case 'LIST':
      return <FaClipboardList size="16px" color={palette.lightblue.main} />;
    case 'MINT':
      return <FaCloudUploadAlt size="16px" color={palette.success.main} />;
    case 'SALE':
      return <MdSell size="16px" color={palette.warning.main} />;
    default:
      return <BsList size="16px" color={palette.lightblue.main} />;
  }
};
