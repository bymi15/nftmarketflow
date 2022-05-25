import { Box, Skeleton } from '@mui/material';

export default function TableSkeleton({ count = 1 }) {
  return [...Array(count)].map((i) => (
    <Box key={i} sx={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
      <Skeleton
        sx={{ bgcolor: '#2b3345' }}
        animation="wave"
        variant="rectangular"
        width={48}
        height={48}
      />
      <Box sx={{ width: '100%', marginLeft: '10px' }}>
        <Skeleton key={i} sx={{ bgcolor: '#2b3345' }} animation="wave" width="100%" height={25} />
        <Skeleton key={i} sx={{ bgcolor: '#2b3345' }} animation="wave" width="100%" height={25} />
      </Box>
    </Box>
  ));
}
