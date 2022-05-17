import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { getActivitiesByUser } from 'api/activities';
import TableSkeleton from 'components/TableSkeleton';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BsCheckCircleFill, BsCreditCardFill } from 'react-icons/bs';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { SiDropbox } from 'react-icons/si';
import { useGlobalContext } from 'state/context';
import { getActivityIcon } from 'utils/utils';
import { getActivityDescription } from 'utils/utils';
import palette from 'vui-theme/assets/theme/base/colors';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import AdobeXD from 'vui-theme/examples/Icons/AdobeXD';
import TimelineItem from 'vui-theme/examples/Timeline/TimelineItem';
import ActivityItem from './ActivityItem';

export default function ActivityTable() {
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
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          My Activity
        </VuiTypography>
        <VuiBox mb={2}>
          <VuiBox display="flex" alignItems="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Recent minting, listing, and purchases
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        {loading ? (
          Array(4)
            .fill()
            .map((i) => (
              <Grid item md={12} key={i} sx={{ marginBottom: '14px' }}>
                <TableSkeleton />
              </Grid>
            ))
        ) : (
          <>
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityItem
                  icon={getActivityIcon(activity)}
                  image={`https://${activity.ipfsHash}.ipfs.nftstorage.link`}
                  title={activity.nftName}
                  description={getActivityDescription(activity, user?.addr)}
                  dateTime={moment(activity.date).fromNow()}
                />
              ))
            ) : (
              <>
                <VuiTypography variant="button" fontWeight="regular" color="text">
                  No activities to display.
                </VuiTypography>
              </>
            )}
          </>
        )}
      </VuiBox>
    </Card>
  );
}
