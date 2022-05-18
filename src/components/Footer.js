import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';

function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: 'column', lg: 'row' }}
      justifyContent="space-between"
      direction="row"
      component="footer"
      py={2}
      pb={0}
    >
      <VuiBox item xs={12} sx={{ textAlign: 'center' }}>
        <VuiTypography
          variant="button"
          sx={{ textAlign: 'center', fontWeight: '400 !important' }}
          color="white"
        >
          Made with ❤️ by{' '}
          <VuiTypography
            component="a"
            variant="button"
            href="https://brianmin.com/"
            sx={{ textAlign: 'center', fontWeight: '500 !important' }}
            color="white"
            mr="2px"
          >
            Brian Min
          </VuiTypography>
        </VuiTypography>
      </VuiBox>
      <VuiBox item xs={10}>
        <VuiBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
          <VuiBox mr={{ xs: '20px', lg: '46px' }}>
            <VuiTypography
              component="a"
              href={`${process.env.PUBLIC_URL}/items`}
              variant="body2"
              color="white"
            >
              Items
            </VuiTypography>
          </VuiBox>
          <VuiBox mr={{ xs: '20px', lg: '46px' }}>
            <VuiTypography
              component="a"
              href={`${process.env.PUBLIC_URL}/activity`}
              variant="body2"
              color="white"
            >
              Activity
            </VuiTypography>
          </VuiBox>
          <VuiBox mr={{ xs: '20px', lg: '46px' }}>
            <VuiTypography
              component="a"
              href={`${process.env.PUBLIC_URL}`}
              variant="body2"
              color="white"
            >
              Home
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

export default Footer;
