import NonFungibleToken from 0xNonFungibleToken
import NFTStore from 0xNFTStore
import NFTMarketplace from 0xNFTMarketplace

pub fun main(account: Address): {UInt64: NFTMarketplace.SaleItem} {
  let saleCollection = getAccount(account).getCapability(/public/SaleCollection)
                        .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
                        ?? panic("Failed to borrow user's SaleCollection")
  let collection = getAccount(account).getCapability(/public/NFTCollection) 
                    .borrow<&NFTStore.Collection{NonFungibleToken.CollectionPublic, NFTStore.CollectionPublic}>()
                    ?? panic("Failed to get user's collection.")
  let saleIDs = saleCollection.getIDs()
  let ownedIDs = collection.getIDs()
  let res: {UInt64: NFTMarketplace.SaleItem} = {}
  for saleID in saleIDs {
    if ownedIDs.contains(saleID) {
      let price = saleCollection.getPrice(id: saleID)
      let nftRef = collection.borrowEntireNFT(id: saleID)
      res.insert(key: nftRef.id, NFTMarketplace.SaleItem(price: price, nftRef: nftRef))
    }
  }
  return res
}