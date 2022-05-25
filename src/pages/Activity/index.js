import Grid from '@mui/material/Grid';
import { getActivitiesByUser } from 'api/activities';
import { useEffect, useState } from 'react';
import { useGlobalContext } from 'state/context';
import VuiBox from 'vui-theme/components/VuiBox';
import ActivityTable from './components/ActivityTable';

export default function Activity() {
  const {
    state: { user, activities },
    dispatch,
  } = useGlobalContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      await getActivitiesByUser(dispatch, user?.addr);
      setLoading(false);
    }
    fetchActivities();
  }, [getActivitiesByUser]);

  return (
    <VuiBox py={3}>
      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        <Grid item md={12}>
          <ActivityTable user={user} activities={activities} loading={loading} />
        </Grid>
      </Grid>
    </VuiBox>
  );
}
