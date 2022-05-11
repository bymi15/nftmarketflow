/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// react-routers components
// @mui material components
import Card from '@mui/material/Card';
// prop-types is library for typechecking of props
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VuiAvatar from 'vui-theme/components/VuiAvatar';
// Vision UI Dashboard React components
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';

function ProfilesList({ title, profiles }) {
  const renderProfiles = profiles.map(({ image, name, description, action }) => (
    <VuiBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt="something here" variant="rounded" shadow="md" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <VuiTypography variant="button" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {description}
        </VuiTypography>
      </VuiBox>
      <VuiBox ml="auto">
        {action.type === 'internal' ? (
          <VuiButton component={Link} to={action.route} variant="text" color="info">
            {action.label}
          </VuiButton>
        ) : (
          <VuiButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </VuiButton>
        )}
      </VuiBox>
    </VuiBox>
  ));

  return (
    <Card sx={{ height: '100%' }}>
      <VuiBox pt={2} px={2}>
        <VuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </VuiTypography>
      </VuiBox>
      <VuiBox p={2}>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
