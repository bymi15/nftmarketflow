import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import { roundToTwo } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';
import AvatarTooltip from './AvatarTooltip';
import PriceUSD from './PriceUSD';

export default function ItemCard({
  image,
  title,
  link,
  price,
  creator,
  owner,
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
      <VuiBox>
        <VuiBox sx={{ display: 'flex', flexDirection: 'row' }} mb={3}>
          <AvatarTooltip label="Owner" value={owner} size={32} />
          <AvatarTooltip label="Creator" value={creator} size={32} sx={{ marginLeft: -1.3 }} />
        </VuiBox>
        <Link to={link}>
          <VuiBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'visible',
            }}
          >
            <VuiBox
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '230px',
              }}
            >
              <VuiBox
                component="img"
                src={image}
                mb="8px"
                borderRadius="15px"
                sx={{ maxHeight: '230px', objectFit: 'contain', height: 'auto', maxWidth: '100%' }}
              />
            </VuiBox>
            <VuiBox mb={1} mt={1}>
              <VuiTypography variant="h5" color="white" textTransform="capitalize">
                {title}
              </VuiTypography>
            </VuiBox>
            {price !== undefined && (
              <VuiBox>
                <VuiTypography variant="button" fontWeight="bold" color="success">
                  {roundToTwo(parseFloat(price))} FLOW
                </VuiTypography>
                <VuiTypography variant="caption" sx={{ marginLeft: '5px', color: '#818ea3' }}>
                  (<PriceUSD value={price} />)
                </VuiTypography>
              </VuiBox>
            )}
          </VuiBox>
        </Link>
        <VuiBox mt={3} display="flex" justifyContent="space-between" alignItems="center">
          {price !== undefined ? (
            onClickRemoveFromSale !== undefined && isOwner ? (
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
              onClickPurchase !== undefined && (
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
            )
          ) : null}
          {onClickListForSale !== undefined && (
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
