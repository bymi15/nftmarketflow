import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';

export default function ProjectRow({ rank, image, title, dateTime, stats }) {
  return (
    <>
      {rank === 1 && (
        <VuiBox sx={{ display: 'flex' }} ml={1.7} mb={1.5}>
          <VuiBox pt={3} mr={1} lineHeight={0}></VuiBox>
          <VuiBox sx={{ width: '70px' }} mr={2} />
          <VuiBox
            sx={{ display: 'flex', flexDirection: 'column' }}
            pt={1.3}
            lineHeight={0}
            minWidth="13rem"
          >
            <VuiTypography variant="button" fontWeight="bold" color="warning">
              Project
            </VuiTypography>
          </VuiBox>
          <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
            <VuiTypography variant="button" fontWeight="bold" color="warning">
              Volume
            </VuiTypography>
          </VuiBox>
          <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
            <VuiTypography variant="button" fontWeight="bold" color="warning">
              Floor Price
            </VuiTypography>
          </VuiBox>
          <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
            <VuiTypography variant="button" fontWeight="bold" color="warning">
              Owners
            </VuiTypography>
          </VuiBox>
          <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
            <VuiTypography variant="button" fontWeight="bold" color="warning">
              Items
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      )}
      <VuiBox sx={{ display: 'flex' }} mb="24px">
        <VuiBox pt={3} mr={2} lineHeight={0}>
          <VuiTypography variant="button" fontWeight="medium" color="warning">
            {rank}
          </VuiTypography>
        </VuiBox>
        <VuiBox
          component="img"
          src={image}
          height="70px"
          sx={{ maxWidth: '70px' }}
          borderRadius="15px"
          mr={2}
        />
        <VuiBox
          sx={{ display: 'flex', flexDirection: 'column' }}
          pt={1.3}
          lineHeight={0}
          minWidth="13rem"
        >
          <VuiTypography variant="button" fontWeight="medium" color="white">
            {title}
          </VuiTypography>
          <VuiBox mt={1} mb={1.5}>
            <VuiTypography variant="caption" fontWeight="medium" color="text">
              {dateTime}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
          <VuiTypography variant="button" fontWeight="medium" color="white">
            {stats?.volume || 0}
          </VuiTypography>
        </VuiBox>
        <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
          <VuiTypography variant="button" fontWeight="medium" color="white">
            {stats?.floorPrice || 0}
          </VuiTypography>
        </VuiBox>
        <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
          <VuiTypography variant="button" fontWeight="medium" color="white">
            {stats?.owners || 0}
          </VuiTypography>
        </VuiBox>
        <VuiBox ml={2} pt={1.3} lineHeight={0} minWidth="6.5rem">
          <VuiTypography variant="button" fontWeight="medium" color="white">
            {stats?.items || 0}
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </>
  );
}
