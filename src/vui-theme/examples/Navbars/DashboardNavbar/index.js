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

// @material-ui core components
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuIcon from '@mui/icons-material/Menu';
import PaymentIcon from '@mui/icons-material/Payment';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// react-router components
import { Link } from 'react-router-dom';
import logoSpotify from 'vui-theme/assets/images/small-logos/logo-spotify.svg';
// Images
import team2 from 'vui-theme/assets/images/team-2.jpg';
// Vision UI Dashboard React components
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
// Vision UI Dashboard React context
import { setMiniSidenav, setTransparentNavbar, useVisionUIController } from 'vui-theme/context';
import NotificationItem from 'vui-theme/examples/Items/NotificationItem';
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from 'vui-theme/examples/Navbars/DashboardNavbar/styles';

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={['New message', 'from Laur']}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={['New album', 'by Travis Scott']}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="text"
        image={
          <PaymentIcon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }} />
        }
        title={['', 'Payment successfully completed']}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Link to="/">
            <VuiTypography variant="button" fontWeight="medium" color="white">
              NFTMarketFlow
            </VuiTypography>
          </Link>
        </VuiBox>
        {isMini ? null : (
          <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            <VuiBox color={light ? 'white' : 'inherit'}>
              <Link to="/authentication/sign-in">
                <IconButton sx={navbarIconButton} size="small">
                  <LockOpenIcon
                    sx={({ palette: { white } }) => ({
                      color: white.main,
                    })}
                  />
                  <VuiTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? 'white' : 'dark'}
                  >
                    Connect to wallet
                  </VuiTypography>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <MenuIcon className={'text-white'} />
              </IconButton>
              {renderMenu()}
            </VuiBox>
          </VuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
