import Grid from '@mui/material/Grid';
import VuiBox from 'vui-theme/components/VuiBox';
import ActivityTable from './components/ActivityTable';

export default function Activity() {
  return (
    <VuiBox py={3}>
      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        <Grid item md={12}>
          <ActivityTable />
        </Grid>
      </Grid>
    </VuiBox>
  );
}
