export const constructSaleItemDoc = (nft, saleItemEvent, userAddr) => ({
  nftID: saleItemEvent.id,
  price: saleItemEvent.price,
  metadata: nft.metadata,
  ipfsHash: nft.ipfsHash,
  uuid: nft.uuid,
  listedBy: userAddr,
});
