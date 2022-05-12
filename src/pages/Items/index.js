import Grid from '@mui/material/Grid';
import { getSaleItems } from 'api/saleItems';
import placeholderImage from 'assets/images/nftplaceholder.jpg';
import ItemCard from 'components/ItemCard';
import ItemCardSkeleton from 'components/ItemCardSkeleton';
import { useEffect, useState } from 'react';
import { useGlobalContext } from 'state/context';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import PurchaseModal from './components/PurchaseModal';

const mockItems = [
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title',
    description: 'Test Description',
    link: '/collections/1',
  },
  {
    image: placeholderImage,
    label: 'Test NFT Collection #' + Math.round(Math.random() * 1000),
    title: 'Test Title',
    description: 'Test Description',
    link: '/collections/1',
  },
];

export default function Items() {
  const {
    state: { user, saleItems },
    dispatch,
  } = useGlobalContext();

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
  }, []);

  const handleOpenModal = (item) => {
    setModalItem(item);
    setModalOpen(true);
  };

  const handlePurchase = (item) => {
    console.log(item);
  };

  return loading ? (
    <VuiBox py={3}>
      <VuiBox mb={3}>
        <VuiTypography color="white" fontWeight="bold">
          NFT Collection
        </VuiTypography>
      </VuiBox>
      <Grid container spacing={5} direction="row" alignItems="stretch">
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
        <VuiBox mb={3}>
          <VuiTypography color="white" fontWeight="bold">
            NFT Collection
          </VuiTypography>
        </VuiBox>
        <Grid container spacing={5} direction="row" alignItems="stretch">
          {saleItems && saleItems.length > 0
            ? saleItems.map((item) => (
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
                  />
                </Grid>
              ))
            : mockItems.map((c) => (
                <Grid item xs={12} md={4} key={c.label}>
                  <ItemCard
                    image={c.image}
                    title={c.title}
                    description={c.description}
                    link={c.link}
                  />
                </Grid>
              ))}
        </Grid>
      </VuiBox>
    </>
  );
}
