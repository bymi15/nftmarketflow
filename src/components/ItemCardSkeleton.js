import { Box, Skeleton } from '@mui/material';

export default function ItemCardSkeleton() {
  return (
    <Box>
      <Skeleton
        sx={{ bgcolor: '#2b3345' }}
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
      />
      <Skeleton sx={{ bgcolor: '#2b3345' }} animation="wave" />
      <Skeleton sx={{ bgcolor: '#2b3345' }} animation="wave" width="60%" />
    </Box>
  );
}
