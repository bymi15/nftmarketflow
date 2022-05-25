import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import TableSkeleton from 'components/TableSkeleton';
import moment from 'moment';
import { getActivityIcon } from 'utils/utils';
import { getActivityDescription } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import ActivityItem from './ActivityItem';

export default function ActivityTable({ user, activities, loading }) {
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
      <VuiBox sx={{ paddingLeft: '10px' }}>
        {loading ? (
          <TableSkeleton count={7} />
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
