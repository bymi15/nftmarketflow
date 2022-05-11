import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';

export default function ItemCard({
  image,
  title,
  description,
  link,
  price,
  isOwner,
  onClickListForSale,
  onClickRemoveFromSale,
  onClickPurchase,
}) {
  return (
    <Card
      sx={{
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        padding: '40px',
      }}
    >
      <VuiBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
        }}
      >
        <VuiBox component="img" src={image} mb="8px" borderRadius="15px" />
        <VuiBox mb={1} mt={1}>
          <VuiTypography variant="h5" color="white" textTransform="capitalize">
            {title}
          </VuiTypography>
        </VuiBox>
        <VuiBox lineHeight={0}>
          <VuiTypography variant="button" fontWeight="regular" color="text">
            {description}
          </VuiTypography>
        </VuiBox>
        {price && (
          <VuiBox>
            <VuiTypography variant="button" fontWeight="bold" color="success">
              {parseFloat(price)} FLOW
            </VuiTypography>
          </VuiBox>
        )}
        <VuiBox mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <VuiButton component={Link} to={link} variant="outlined" size="small" color="info">
            View
          </VuiButton>
          {price &&
            (onClickRemoveFromSale && isOwner ? (
              <VuiButton
                component={Button}
                onClick={onClickRemoveFromSale}
                variant="outlined"
                size="small"
                color="warning"
              >
                Remove from sale
              </VuiButton>
            ) : (
              !isOwner &&
              onClickPurchase && (
                <VuiButton
                  component={Button}
                  onClick={onClickPurchase}
                  variant="outlined"
                  size="small"
                  color="success"
                >
                  Buy NFT
                </VuiButton>
              )
            ))}
          {onClickListForSale && (
            <VuiButton
              component={Button}
              onClick={onClickListForSale}
              variant="outlined"
              size="small"
              color="success"
            >
              List For Sale
            </VuiButton>
          )}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}
