import Grid from '@mui/material/Grid';
import { upsertSaleItem } from 'api/saleItems';
import ItemCard from 'components/ItemCard';
import { getSaleItemListedEvent } from 'flow/events';
import { listNFTForSale } from 'flow/listNFTForSale';
import { setupUser } from 'flow/setupUser';
import { loginWallet } from 'flow/wallet';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setLoadingAction } from 'state/actions/loadingActions';
import { useGlobalContext } from 'state/context';
import { constructSaleItemDoc } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';
import ListForSaleModal from './components/ListForSaleModal';

export default function Collection() {
  const {
    state: { user, loggedIn, collection, salesCollection, collectionReady },
    dispatch,
  } = useGlobalContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState();
  const handleListForSale = async (item, nft) => {
    try {
      const txID = await listNFTForSale(item, dispatch);
      console.log(txID);
      const saleItemEvent = await getSaleItemListedEvent();
      setLoadingAction(dispatch, true, 'Saving NFT listing in database...');
      const apiResponse = await upsertSaleItem(
        dispatch,
        constructSaleItemDoc(nft, saleItemEvent, user.addr)
      );
      setLoadingAction(dispatch, false, '');
      toast(`Success! Your NFT has been listed for sale at ${saleItemEvent.price} FLOW`);
      console.log(apiResponse);
    } catch (e) {
      setLoadingAction(dispatch, false, '');
      console.log('error occurred while listing NFT for sale');
      console.log(e);
    }
  };

  const handleRemoveFromSale = async (item) => {
    // const txID = await listNFTForSale(item, dispatch);
    // console.log(txID);
    // await getSaleItemListedEvent((event) => console.log(event));
    const event = await getSaleItemListedEvent();
    console.log(event);
  };

  const handleOpenModal = (nft) => {
    setSelectedNFT(nft);
    setModalOpen(true);
  };

  return user && loggedIn && collectionReady ? (
    <>
      <ListForSaleModal
        open={modalOpen}
        setOpen={setModalOpen}
        nft={selectedNFT}
        handleListForSale={handleListForSale}
      />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <VuiTypography color="white" fontWeight="bold">
            NFT Collection
          </VuiTypography>
        </VuiBox>
        <Grid container spacing={5} direction="row" alignItems="stretch">
          {collection && collection.length > 0 ? (
            collection.map((nft) => (
              <Grid key={nft.id} item xs={12} md={4}>
                <ItemCard
                  image={`https://${nft.ipfsHash}.ipfs.nftstorage.link`}
                  title={nft.metadata?.name}
                  description={nft.metadata?.description}
                  link={`/nft/${nft.id}`}
                  onClickListForSale={() => handleOpenModal(nft)}
                />
              </Grid>
            ))
          ) : (
            <Grid item md={12}>
              <VuiTypography color="white">No NFTs in your collection.</VuiTypography>
            </Grid>
          )}
        </Grid>
      </VuiBox>
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <VuiTypography color="white" fontWeight="bold">
            NFTs For Sale
          </VuiTypography>
        </VuiBox>
        <Grid container spacing={5} direction="row" alignItems="stretch">
          {salesCollection && Object.keys(salesCollection).length > 0 ? (
            Object.keys(salesCollection).map((id) => (
              <Grid key={id} item xs={12} md={4}>
                <ItemCard
                  image={`https://${salesCollection[id].nftRef?.ipfsHash}.ipfs.nftstorage.link`}
                  title={salesCollection[id].nftRef?.metadata?.name}
                  description={salesCollection[id].nftRef?.metadata?.description}
                  link={`/nft/${salesCollection[id].nftRef?.id}`}
                  price={salesCollection[id].price}
                  onClickRemoveFromSale={handleRemoveFromSale}
                  isOwner
                />
              </Grid>
            ))
          ) : (
            <Grid item md={12}>
              <VuiTypography color="white">No NFTs in your sales collection.</VuiTypography>
            </Grid>
          )}
        </Grid>
      </VuiBox>
    </>
  ) : !user || !loggedIn ? (
    <VuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
    >
      <VuiTypography color="white" fontWeight="bold" component="h3">
        Please connect to your wallet
      </VuiTypography>
      <VuiButton
        onClick={() => loginWallet(dispatch)}
        color="success"
        variant="contained"
        sx={{ marginTop: '10px' }}
      >
        Connect to wallet
      </VuiButton>
    </VuiBox>
  ) : !collectionReady ? (
    <VuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
    >
      <VuiTypography color="white" fontWeight="bold" component="h3">
        Your collection needs to be set up first
      </VuiTypography>
      <VuiButton
        onClick={() => setupUser(dispatch)}
        color="success"
        variant="contained"
        sx={{ marginTop: '10px' }}
      >
        Setup Collection
      </VuiButton>
    </VuiBox>
  ) : (
    <VuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
    >
      <VuiTypography color="white" fontWeight="bold" component="h3">
        Please refresh the page.
      </VuiTypography>
    </VuiBox>
  );
}
