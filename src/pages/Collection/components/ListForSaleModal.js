import { Modal } from '@mui/material';
import { useEffect } from 'react';
import { handleInputChange, useNestedState } from 'utils/hooks';
import { getImageURL } from 'utils/utils';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiInput from 'vui-theme/components/VuiInput';
import VuiTypography from 'vui-theme/components/VuiTypography';

export default function ListForSaleModal({ open, setOpen, nft, handleListForSale }) {
  const [item, setItem] = useNestedState({ id: parseInt(nft?.id || 0), price: 0.0 });

  useEffect(() => {
    setItem({ id: parseInt(nft?.id) });
  }, nft?.id);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <VuiBox
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -65%)',
          width: 500,
          bgcolor: '#344767',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <VuiTypography color="white" variant="h6" component="h2">
          {nft?.metadata?.name}
        </VuiTypography>
        <VuiBox
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <VuiBox
            component="img"
            src={getImageURL(nft?.ipfsHash)}
            borderRadius="15px"
            sx={{ width: 200 }}
          />
        </VuiBox>
        <VuiBox>
          <VuiTypography color="white" variant="body2">
            Enter Price (FLOW)
          </VuiTypography>
          <VuiInput
            type="number"
            id="price"
            name="price"
            value={item.price}
            onChange={(e) => handleInputChange(e, setItem)}
            fullWidth
            size="large"
          />
        </VuiBox>
        <VuiBox
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <VuiButton
            onClick={() => {
              handleListForSale(item, nft);
              setOpen(false);
            }}
            color="success"
            variant="contained"
          >
            List For Sale
          </VuiButton>
          <VuiButton
            onClick={() => {
              setOpen(false);
            }}
            color="white"
            variant="outlined"
          >
            Cancel
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </Modal>
  );
}
