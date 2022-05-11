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

// @mui material components
import { createTheme } from '@mui/material/styles';
import borders from 'vui-theme/assets/theme/base/borders';
import boxShadows from 'vui-theme/assets/theme/base/boxShadows';
import breakpoints from 'vui-theme/assets/theme/base/breakpoints';
// Vision UI Dashboard React base styles
import colors from 'vui-theme/assets/theme/base/colors';
import globals from 'vui-theme/assets/theme/base/globals';
import typography from 'vui-theme/assets/theme/base/typography';
import appBar from 'vui-theme/assets/theme/components/appBar';
import avatar from 'vui-theme/assets/theme/components/avatar';
import breadcrumbs from 'vui-theme/assets/theme/components/breadcrumbs';
import button from 'vui-theme/assets/theme/components/button';
import buttonBase from 'vui-theme/assets/theme/components/buttonBase';
import card from 'vui-theme/assets/theme/components/card';
import cardContent from 'vui-theme/assets/theme/components/card/cardContent';
import cardMedia from 'vui-theme/assets/theme/components/card/cardMedia';
import container from 'vui-theme/assets/theme/components/container';
import divider from 'vui-theme/assets/theme/components/divider';
import autocomplete from 'vui-theme/assets/theme/components/form/autocomplete';
import checkbox from 'vui-theme/assets/theme/components/form/checkbox';
import formControlLabel from 'vui-theme/assets/theme/components/form/formControlLabel';
import formLabel from 'vui-theme/assets/theme/components/form/formLabel';
import input from 'vui-theme/assets/theme/components/form/input';
import inputBase from 'vui-theme/assets/theme/components/form/inputBase';
import radio from 'vui-theme/assets/theme/components/form/radio';
import select from 'vui-theme/assets/theme/components/form/select';
import switchButton from 'vui-theme/assets/theme/components/form/switchButton';
import icon from 'vui-theme/assets/theme/components/icon';
import iconButton from 'vui-theme/assets/theme/components/iconButton';
import linearProgress from 'vui-theme/assets/theme/components/linearProgress';
import link from 'vui-theme/assets/theme/components/link';
import list from 'vui-theme/assets/theme/components/list';
import listItem from 'vui-theme/assets/theme/components/list/listItem';
import listItemText from 'vui-theme/assets/theme/components/list/listItemText';
import menu from 'vui-theme/assets/theme/components/menu';
import menuItem from 'vui-theme/assets/theme/components/menu/menuItem';
import popover from 'vui-theme/assets/theme/components/popover';
// Vision UI Dashboard React components base styles for @mui material components
import sidenav from 'vui-theme/assets/theme/components/sidenav';
import slider from 'vui-theme/assets/theme/components/slider';
import stepper from 'vui-theme/assets/theme/components/stepper';
import step from 'vui-theme/assets/theme/components/stepper/step';
import stepConnector from 'vui-theme/assets/theme/components/stepper/stepConnector';
import stepIcon from 'vui-theme/assets/theme/components/stepper/stepIcon';
import stepLabel from 'vui-theme/assets/theme/components/stepper/stepLabel';
import svgIcon from 'vui-theme/assets/theme/components/svgIcon';
import tableCell from 'vui-theme/assets/theme/components/table/tableCell';
import tableContainer from 'vui-theme/assets/theme/components/table/tableContainer';
import tableHead from 'vui-theme/assets/theme/components/table/tableHead';
import tabs from 'vui-theme/assets/theme/components/tabs';
import tab from 'vui-theme/assets/theme/components/tabs/tab';
import tooltip from 'vui-theme/assets/theme/components/tooltip';
// Vision UI Dashboard React helper functions
import boxShadow from 'vui-theme/assets/theme/functions/boxShadow';
import hexToRgb from 'vui-theme/assets/theme/functions/hexToRgb';
import linearGradient from 'vui-theme/assets/theme/functions/linearGradient';
import pxToRem from 'vui-theme/assets/theme/functions/pxToRem';
import rgba from 'vui-theme/assets/theme/functions/rgba';

export default createTheme({
  direction: 'rtl',
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInputBase: { ...inputBase },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiInput: { ...input },
    MuiOutlinedInput: { ...input },
    MuiFilledInput: { ...input },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
  },
});
