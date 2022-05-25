import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { getActivities } from 'api/activities';
import { getActivitiesByUser } from 'api/activities';
import { getSaleItems } from 'api/saleItems';
import mainScreenImage from 'assets/images/mainscreen.jpg';
import { useEffect, useState } from 'react';
import { useGlobalContext } from 'state/context';
import { sortItemsByRecentDate } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import FeaturedItems from './components/FeaturedItems';
import Jumbotron from './components/Jumbotron';
import RecentActivities from './components/RecentActivities';

export default function Home() {
  const {
    state: { saleItems, activities },
    dispatch,
  } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    async function loadSaleItems() {
      setLoading(true);
      await getSaleItems(dispatch);
      setLoading(false);
    }
    loadSaleItems();
  }, [getSaleItems]);

  useEffect(() => {
    async function fetchActivities() {
      setLoadingActivities(true);
      await getActivities(dispatch);
      setLoadingActivities(false);
    }
    fetchActivities();
  }, [getActivitiesByUser]);

  return (
    <VuiBox py={3}>
      <VuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Jumbotron />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
              }}
              borderRadius="4%"
              alt="Main Screen Image"
              src={mainScreenImage}
            />
          </Grid>
        </Grid>
      </VuiBox>
      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={6} lg={8}>
          <FeaturedItems items={sortItemsByRecentDate(saleItems)} loading={loading} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RecentActivities activities={activities} loading={loadingActivities} />
        </Grid>
      </Grid>
    </VuiBox>
  );
}
