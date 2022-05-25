import Grid from '@mui/material/Grid';
import VuiBox from 'vui-theme/components/VuiBox';
import ProjectTable from './components/ProjectTable';

export default function Rankings() {
  return (
    <VuiBox py={3}>
      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        <Grid item md={12}>
          <ProjectTable />
        </Grid>
      </Grid>
    </VuiBox>
  );
}
