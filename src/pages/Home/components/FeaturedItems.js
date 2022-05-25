import Card from '@mui/material/Card';
import AvatarTooltip from 'components/AvatarTooltip';
import PriceUSD from 'components/PriceUSD';
import TableSkeleton from 'components/TableSkeleton';
import { BsCheckCircleFill } from 'react-icons/bs';
import { getImageURL } from 'utils/utils';
import { roundToTwo } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiTypography from 'vui-theme/components/VuiTypography';
import Table from 'vui-theme/examples/Tables/Table';

const columns = [
  { name: 'item', align: 'left' },
  { name: 'price', align: 'left' },
  { name: 'owner / creator', align: 'center' },
];

export default function FeaturedItems({ items, loading }) {
  const rows =
    items && items.length > 0
      ? items.slice(0, 7).map((item) => ({
          item: (
            <VuiBox display="flex" alignItems="center">
              <VuiBox
                component="img"
                src={getImageURL(item.ipfsHash)}
                height="30px"
                sx={{ maxWidth: '30px' }}
              />
              <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
                {item.metadata?.name}
              </VuiTypography>
            </VuiBox>
          ),
          price: (
            <VuiBox display="flex" alignItems="center">
              <VuiTypography variant="button" color="white" fontWeight="bold">
                {roundToTwo(parseFloat(item.price))} FLOW
              </VuiTypography>
              <VuiTypography variant="caption" sx={{ marginLeft: '5px', color: '#818ea3' }}>
                (<PriceUSD value={item.price} />)
              </VuiTypography>
            </VuiBox>
          ),
          ['owner / creator']: (
            <VuiBox display="flex">
              <AvatarTooltip label="Owner" value={item.listedBy} size={24} />
              <AvatarTooltip
                label="Creator"
                value={item.metadata?.creator}
                size={24}
                sx={{ marginLeft: -1.1 }}
              />
            </VuiBox>
          ),
        }))
      : [];

  return (
    <Card
      sx={{
        height: '100% !important',
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Featured Items
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>{items?.length || 0} items</strong> listed for sale
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox
        sx={{
          '& th': {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          '& .MuiTableRow-root:not(:last-child)': {
            '& td': {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}
      >
        {loading ? <TableSkeleton count={4} /> : <Table columns={columns} rows={rows} />}
      </VuiBox>
    </Card>
  );
}
