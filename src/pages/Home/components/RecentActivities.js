import Card from '@mui/material/Card';
import TableSkeleton from 'components/TableSkeleton';
import moment from 'moment';
import { BsCheckCircleFill } from 'react-icons/bs';
import { getActivityDescription } from 'utils/utils';
import { getActivityIcon } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import RecentActivityItem from './RecentActivityItem';

export default function RecentActivities({ activities, loading }) {
  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Recent Activities
        </VuiTypography>
        <VuiBox mb={2}>
          <VuiBox display="flex" alignItems="center">
            <BsCheckCircleFill color="green" size="15px" mr="5px" />
            <VuiTypography variant="button" color="text" fontWeight="medium" ml="5px" mr="2px">
              {activities?.length || 0}
            </VuiTypography>{' '}
            <VuiTypography variant="button" color="text" fontWeight="regular">
              transactions in the past month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        {loading ? (
          <TableSkeleton count={7} />
        ) : activities && activities.length > 0 ? (
          activities
            .slice(0, 7)
            .map((activity) => (
              <RecentActivityItem
                key={activity._id}
                icon={getActivityIcon(activity)}
                title={activity.nftName}
                description={getActivityDescription(activity, null, false)}
                date={moment(activity.date).fromNow()}
                user={activity.userAddr}
              />
            ))
        ) : (
          <RecentActivityItem title="No recent activities to display" />
        )}
      </VuiBox>
    </Card>
  );
}
