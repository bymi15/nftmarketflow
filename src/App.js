import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { getIPFSToken } from 'api/ipfsToken';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import Navbar from 'components/Navbar';
import PageLayout from 'components/PageLayout';
import { loadFCLConfig } from 'flow/fclConfig';
import { getUserNFTs } from 'flow/getUserNFTs';
import { getUserNFTsForSale } from 'flow/getUserNFTsForSale';
import { subscribeUser } from 'flow/wallet';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from 'Routes';
import { resetCollectionAction } from 'state/actions/collectionActions';
import { setLoadingAction } from 'state/actions/loadingActions';
import { resetSalesCollectionAction } from 'state/actions/salesCollectionActions';
import { useGlobalContext } from 'state/context';

export default function App() {
  const { pathname } = useLocation();
  const {
    state: { user, loading, loadingText, ipfsToken },
    dispatch,
  } = useGlobalContext();

  useEffect(() => {
    loadFCLConfig();
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    subscribeUser(dispatch);
  }, []);

  useEffect(() => {
    async function fetchNFTs(addr) {
      try {
        await getUserNFTs(dispatch, addr);
      } catch (e) {
        console.log('error occurred while getting collection');
        setLoadingAction(dispatch, false, '');
        resetCollectionAction(dispatch);
      }
    }

    async function fetchNFTsForSale(addr) {
      try {
        await getUserNFTsForSale(dispatch, addr);
      } catch (e) {
        console.log('error occurred while getting sales collection');
        setLoadingAction(dispatch, false, '');
        resetSalesCollectionAction(dispatch);
      }
    }

    if (user?.addr) {
      fetchNFTs(user.addr);
      fetchNFTsForSale(user.addr);
    }
  }, [user]);

  useEffect(() => {
    async function fetchIPFSToken() {
      try {
        await getIPFSToken(dispatch);
      } catch (e) {
        console.log('error occurred while getting ipfs token');
        setLoadingAction(dispatch, false, '');
      }
    }
    if (!ipfsToken) {
      fetchIPFSToken();
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Loader isActive={loading} text={loadingText}>
        <ToastContainer />
        <PageLayout>
          <Container>
            <Navbar />
            <Routes />
            <Footer />
          </Container>
        </PageLayout>
      </Loader>
    </>
  );
}
