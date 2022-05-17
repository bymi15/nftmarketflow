import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { roundToTwo } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';
import PriceUSD from './PriceUSD';

export default function ItemCard({
  image,
  title,
  link,
  price,
  creator,
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
        <VuiBox mb={3}>
          <Tooltip title={`Creator: ${creator}`}>
            <Avatar
              alt="creator"
              sx={{
                width: 32,
                height: 32,
                background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
              }}
            ></Avatar>
          </Tooltip>
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
            {price && (
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
