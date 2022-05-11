import PropTypes from 'prop-types';
import VuiBox from 'vui-theme/components/VuiBox';

export default function PageLayout({ children }) {
  return (
    <VuiBox
      width="100vw"
      maxWidth="100%"
      height="100%"
      minHeight="100vh"
      sx={({ functions: { tripleLinearGradient }, palette: { gradients } }) => ({
        overflowX: 'hidden',
        backgroundImage: tripleLinearGradient(
          gradients.cover.main,
          gradients.cover.state,
          gradients.cover.stateSecondary,
          gradients.cover.deg
        ),
        position: 'relative',
      })}
    >
      {children}
    </VuiBox>
  );
}

PageLayout.defaultProps = {
  background: 'default',
};

PageLayout.propTypes = {
  background: PropTypes.oneOf(['white', 'light', 'default']),
  children: PropTypes.node.isRequired,
};
