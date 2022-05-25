import Grid from '@mui/material/Grid';
import { removeSaleItem } from 'api/saleItems';
import { getSaleItems } from 'api/saleItems';
import placeholderImage from 'assets/images/nftplaceholder.jpg';
import ItemCard from 'components/ItemCard';
import ItemCardSkeleton from 'components/ItemCardSkeleton';
import { purchaseNFT } from 'flow/purchaseNFT';
import { loginWallet } from 'flow/wallet';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from 'state/context';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import PurchaseModal from './components/PurchaseModal';
import { handleRemoveFromSale } from 'utils/utils';
import { setLoadingAction } from 'state/actions/loadingActions';
import { getUserNFTs } from 'flow/getUserNFTs';
import { insertActivity } from 'api/activities';
import { constructActivityDoc } from 'utils/utils';
import { getSaleItemPurchasedEvent } from 'flow/events';
import { sortItemsByRecentDate } from 'utils/utils';

const mockItems = [
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title 1',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title 2',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title 3',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title 4',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title 5',
    description: 'Test Description',
    link: '/collections/1',
  },
];

export default function Items() {
  const {
    state: { user, loggedIn, saleItems },
    dispatch,
  } = useGlobalContext();

  const [sortedSaleItems, setSortedSaleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState();

  useEffect(() => {
    async function loadSaleItems() {
      await getSaleItems(dispatch);
      setLoading(false);
    }
    setLoading(true);
    loadSaleItems();
  }, [getSaleItems]);

  useEffect(() => {
    if (saleItems && saleItems.length > 0) {
      setSortedSaleItems(sortItemsByRecentDate(saleItems));
    }
  }, [saleItems]);

  const handleOpenModal = (item) => {
    setModalItem(item);
    setModalOpen(true);
  };

  const handlePurchase = async (item) => {
    if (!loggedIn || !user) {
      toast.warn(`Please connect to your wallet to make a purchase.`);
      loginWallet(dispatch);
      return;
    }

    try {
      await purchaseNFT(item.listedBy, item.nftID, dispatch);
      const purchasedEvent = await getSaleItemPurchasedEvent(dispatch);
      console.log(purchasedEvent);
      setLoadingAction(dispatch, true, 'Updating database...');
      await removeSaleItem(dispatch, item._id);
      await insertActivity(dispatch, constructActivityDoc('SALE', null, item, user?.addr));
      toast.success('Success! Purchased NFT has been transferred to your collection.');
      await getUserNFTs(dispatch, user?.addr);
    } catch (err) {
      toast.error(`Error while purchasing NFT. Please try again.`);
      console.log(err);
    }

    setLoadingAction(dispatch, false, '');
  };

  return loading ? (
    <VuiBox py={3}>
      <Grid container mt={3} spacing={5} direction="row" alignItems="stretch">
        {Array(6)
          .fill()
          .map((i) => (
            <Grid item xs={12} md={4} key={i}>
              <ItemCardSkeleton />
            </Grid>
          ))}
      </Grid>
    </VuiBox>
  ) : (
    <>
      <PurchaseModal
        open={modalOpen}
        setOpen={setModalOpen}
        item={modalItem}
        handlePurchase={handlePurchase}
      />
      <VuiBox py={3}>
        <Grid container mt={3} spacing={5} direction="row" alignItems="stretch">
          {sortedSaleItems.length > 0 ? (
            sortedSaleItems.map((item) => (
              <Grid item xs={12} md={4} key={item.nftID}>
                <ItemCard
                  image={`https://${item.ipfsHash}.ipfs.nftstorage.link`}
                  title={item.metadata?.name}
                  description={item.metadata?.description}
                  link={`/nft/${item.nftID}`}
                  price={item.price}
                  isOwner={item.listedBy === user?.addr}
                  onClickPurchase={() => handleOpenModal(item)}
                  creator={item.metadata?.creator}
                  owner={item.listedBy}
                  onClickRemoveFromSale={() => handleRemoveFromSale(dispatch, item)}
                />
              </Grid>
            ))
          ) : (
            <Grid item md={12}>
              <VuiTypography variant="caption" color="white">
                No items to display.
              </VuiTypography>
            </Grid>
          )}
        </Grid>
      </VuiBox>
    </>
  );
}
