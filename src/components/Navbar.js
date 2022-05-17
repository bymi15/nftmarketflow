import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { setupUser } from 'flow/setupUser';
import { loginWallet, logoutWallet } from 'flow/wallet';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUserAction } from 'state/actions/userActions';
import { useGlobalContext } from 'state/context';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';
import {
  navbar,
  navbarContainer,
  navbarIconButton,
  navbarRow,
} from 'vui-theme/examples/Navbars/DashboardNavbar/styles';

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const {
    state: { user, loggedIn, collectionReady },
    dispatch,
  } = useGlobalContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenDropdownMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogin = () => {
    loginWallet(dispatch);
  };

  const handleLogout = () => {
    logoutWallet();
    logoutUserAction(dispatch);
    setAnchorEl(null);
  };

  const handleSetupCollection = async () => {
    await setupUser(dispatch);
  };

  return (
    <AppBar
      position="relative"
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar: true })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, {})}>
          <Link to="/">
            <VuiTypography variant="button" fontWeight="medium" color="white">
              NFTMarketFlow
            </VuiTypography>
          </Link>
        </VuiBox>
        <VuiBox sx={(theme) => navbarRow(theme, {})}>
          <VuiBox color="inherit">
            <Link to="/items">
              <VuiButton sx={{ marginRight: '10px' }} variant="contained" color="info" size="small">
                <VuiTypography variant="button" fontWeight="medium" color="white">
                  Explore
                </VuiTypography>
              </VuiButton>
            </Link>
            <Link to="/create">
              <VuiButton
                sx={{ marginRight: '10px' }}
                variant="contained"
                color="success"
                size="small"
              >
                <VuiTypography variant="button" fontWeight="medium" color="white">
                  Create
                </VuiTypography>
              </VuiButton>
            </Link>
            {loggedIn && user ? (
              <>
                <IconButton sx={navbarIconButton} size="small" onClick={handleOpenDropdownMenu}>
                  <AccountCircleIcon
                    sx={({ palette: { white } }) => ({
                      color: white.main,
                    })}
                  />
                  <VuiTypography variant="button" fontWeight="medium" color="white">
                    {user.addr}
                  </VuiTypography>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {collectionReady ? (
                    <MenuItem onClick={() => navigate('/collection')}>My Collection</MenuItem>
                  ) : (
                    <MenuItem onClick={handleSetupCollection}>Setup My Collection</MenuItem>
                  )}
                  <MenuItem onClick={() => navigate('/activity')}>My Activity</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/authentication/sign-in">
                <IconButton sx={navbarIconButton} size="small" onClick={handleLogin}>
                  <LockOpenIcon
                    sx={({ palette: { white } }) => ({
                      color: white.main,
                    })}
                  />
                  <VuiTypography variant="button" fontWeight="medium" color="dark">
                    Connect to wallet
                  </VuiTypography>
                </IconButton>
              </Link>
            )}
          </VuiBox>
        </VuiBox>
      </Toolbar>
    </AppBar>
  );
}
