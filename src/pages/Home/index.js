import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import mainScreenImage from 'assets/images/mainscreen.jpg';
import VuiBox from 'vui-theme/components/VuiBox';
import FeaturedItems from './components/FeaturedItems';
import Jumbotron from './components/Jumbotron';
import RecentTransactions from './components/RecentTransactions';

export default function Home() {
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
          <FeaturedItems />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RecentTransactions />
        </Grid>
      </Grid>
    </VuiBox>
  );
}
