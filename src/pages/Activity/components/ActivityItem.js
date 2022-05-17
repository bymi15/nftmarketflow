import VuiBadge from 'vui-theme/components/VuiBadge';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import { timelineItem } from 'vui-theme/examples/Timeline/TimelineItem/styles';

export default function ActivityItem({
  color,
  icon,
  image,
  title,
  dateTime,
  description,
  badges,
  lastItem,
}) {
  const renderBadges =
    badges && badges.length > 0
      ? badges.map((badge, key) => {
          const badgeKey = `badge-${key}`;
          return (
            <VuiBox key={badgeKey} mr={key === badges.length - 1 ? 0 : 0.5}>
              <VuiBadge color={color} size="xs" badgeContent={badge} container />
            </VuiBox>
          );
        })
      : null;

  return (
    <VuiBox position="relative" mb="24px" sx={(theme) => timelineItem(theme, { color })}>
      <VuiBox
        component="img"
        src={image}
        height="70px"
        sx={{ maxWidth: '70px' }}
        borderRadius="15px"
        position="absolute"
        top="3.25%"
        left="-8px"
        zIndex={1}
      />
      <VuiBox
        width="1.625rem"
        height="1.625rem"
        borderRadius="50%"
        position="absolute"
        top="3.25%"
        left="75px"
        zIndex={2}
      >
        {icon}
      </VuiBox>
      <VuiBox ml="100px" pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <VuiTypography variant="button" fontWeight="medium" color="white">
          {title}
        </VuiTypography>
        <VuiBox mt={0.5}>
          {description ? (
            <VuiTypography variant="button" fontWeight="regular" color="text">
              {description}
            </VuiTypography>
          ) : null}
        </VuiBox>
        <VuiBox mt={2} mb={1.5}>
          <VuiTypography variant="caption" fontWeight="medium" color="text">
            {dateTime}
          </VuiTypography>
        </VuiBox>
        {badges && badges.length > 0 ? (
          <VuiBox display="flex" pb={lastItem ? 1 : 2}>
            {renderBadges}
          </VuiBox>
        ) : null}
      </VuiBox>
    </VuiBox>
  );
}
