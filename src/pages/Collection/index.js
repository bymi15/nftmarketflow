import Grid from '@mui/material/Grid';
import { upsertSaleItem } from 'api/saleItems';
import ItemCard from 'components/ItemCard';
import ItemCardSkeleton from 'components/ItemCardSkeleton';
import { getSaleItemListedEvent } from 'flow/events';
import { getUserNFTsForSale } from 'flow/getUserNFTsForSale';
import { listNFTForSale } from 'flow/listNFTForSale';
import { setupUser } from 'flow/setupUser';
import { loginWallet } from 'flow/wallet';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { setLoadingAction } from 'state/actions/loadingActions';
import { useGlobalContext } from 'state/context';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';
import ListForSaleModal from './components/ListForSaleModal';
import {
  handleRemoveFromSale,
  constructActivityDoc,
  isItemForSale,
  constructSaleItemDoc,
} from 'utils/utils';
import TabPanel from 'components/TabPanel';
import { Tab, Tabs } from '@mui/material';
import { insertActivity } from 'api/activities';

export default function Collection() {
  const {
    state: { user, loggedIn, collection, salesCollection, collectionReady, loading },
    dispatch,
  } = useGlobalContext();
  const [processedCollection, setProcessedCollection] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    let newCollection = [];
    if (collection && salesCollection) {
      for (let c of collection) {
        let newC = { ...c, forSale: false };
        newC.forSale = isItemForSale(c, salesCollection);
        newCollection.push(newC);
      }
      setProcessedCollection(newCollection);
    }
  }, [collection, salesCollection, setProcessedCollection]);

  const handleListForSale = async (item, nft) => {
    try {
      await listNFTForSale(item, dispatch);
      const saleItemEvent = await getSaleItemListedEvent();
      setLoadingAction(dispatch, true, 'Saving NFT listing in database...');
      await upsertSaleItem(dispatch, constructSaleItemDoc(nft, saleItemEvent, user?.addr));
      await getUserNFTsForSale(dispatch, user?.addr);
      await insertActivity(dispatch, constructActivityDoc('LIST', nft, saleItemEvent, user?.addr));
      setLoadingAction(dispatch, false, '');
      toast.success(`Success! Your NFT has been listed for sale at ${saleItemEvent.price} FLOW`);
    } catch (e) {
      setLoadingAction(dispatch, false, '');
      toast.error(`Error while listing NFT for sale. Please try again.`);
      console.log(e);
    }
  };

  const handleOpenModal = (nft) => {
    setSelectedNFT(nft);
    setModalOpen(true);
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
  ) : user && loggedIn && collectionReady ? (
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
        <VuiBox sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '10px' }}>
          <Tabs
            sx={{ background: 'transparent' }}
            value={selectedTab}
            onChange={(_, val) => setSelectedTab(val)}
            aria-label="Tabs"
          >
            <Tab label="Owned" id="tab0" aria-controls="tabPanel0" />
            <Tab label="On Sale" id="tab1" aria-controls="tabPanel1" />
          </Tabs>
        </VuiBox>
        <TabPanel value={selectedTab} index={0}>
          <Grid container spacing={5} direction="row" alignItems="stretch">
            {processedCollection.length > 0 ? (
              processedCollection.map((nft) => (
                <Grid key={nft.id} item xs={12} md={4}>
                  <ItemCard
                    image={`https://${nft.ipfsHash}.ipfs.nftstorage.link`}
                    title={nft.metadata?.name}
                    description={nft.metadata?.description}
                    link={`/nft/${nft.id}`}
                    onClickListForSale={nft.forSale ? undefined : () => handleOpenModal(nft)}
                    creator={nft.metadata?.creator}
                    owner={user?.addr}
                  />
                </Grid>
              ))
            ) : (
              <Grid item md={12}>
                <VuiTypography color="white">No NFTs in your collection.</VuiTypography>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
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
                    // onClickRemoveFromSale={() => handleRemoveFromSale(dispatch, item)}
                    creator={salesCollection[id].nftRef?.metadata?.creator}
                    isOwner
                  />
                </Grid>
              ))
            ) : (
              <Grid item md={12}>
                <VuiTypography color="white">No NFTs for sale.</VuiTypography>
              </Grid>
            )}
          </Grid>
        </TabPanel>
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
