import AvatarTooltip from 'components/AvatarTooltip';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';

function RecentActivityItem({ icon, title, description, date, user }) {
  return (
    <VuiBox position="relative" mb="24px">
      <VuiBox
        width="1.625rem"
        height="1.625rem"
        borderRadius="50%"
        position="absolute"
        top="3.25%"
        left="-8px"
        zIndex={2}
      >
        {icon}
      </VuiBox>
      <VuiBox ml="30px" pt={0.7} lineHeight={0} maxWidth="30rem">
        <VuiTypography variant="button" fontWeight="medium" color="white">
          {title}{' '}
        </VuiTypography>
        <VuiTypography variant="caption" fontWeight="medium" color="text">
          {description}
        </VuiTypography>
        <VuiBox sx={{ display: 'flex' }} mt={0.5}>
          <VuiTypography variant="caption" fontWeight="medium" color="text" mr={0.5}>
            {date}
          </VuiTypography>
          <VuiTypography variant="caption" fontWeight="medium" color="text" mr={0.5}>
            by
          </VuiTypography>
          <AvatarTooltip label="User" value={user} size={20} />
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

export default RecentActivityItem;
