import { Modal } from '@mui/material';
import VuiBox from 'vui-theme/components/VuiBox';
import VuiButton from 'vui-theme/components/VuiButton';
import VuiTypography from 'vui-theme/components/VuiTypography';

export default function PurchaseModal({ open, setOpen, item, handlePurchase }) {
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
          {item?.metadata?.name}
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
            src={`https://${item?.ipfsHash}.ipfs.nftstorage.link`}
            borderRadius="15px"
            sx={{ width: 200 }}
          />
        </VuiBox>
        <VuiBox>
          <VuiTypography color="white" variant="body2">
            {item?.price} FLOW
          </VuiTypography>
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
              handlePurchase(item);
              setOpen(false);
            }}
            color="success"
            variant="contained"
          >
            Buy NFT
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
