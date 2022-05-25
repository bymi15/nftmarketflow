import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

export default function AvatarTooltip({ label, value, size = 32, sx }) {
  return (
    <Tooltip placement="top" title={`${label}: ${value}`}>
      <Avatar
        alt={label}
        sx={{
          width: size,
          height: size,
          margin: 0,
          background:
            label === 'Owner'
              ? 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
              : 'linear-gradient(0deg, rgba(80,50,99,1) 0%, rgba(198,88,57,1) 100%)',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
          ...sx,
        }}
      ></Avatar>
    </Tooltip>
  );
}
