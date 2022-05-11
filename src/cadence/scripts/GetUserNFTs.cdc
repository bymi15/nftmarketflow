
import NonFungibleToken from 0xNonFungibleToken
import NFTStore from 0xNFTStore

pub fun main(account: Address): [&NFTStore.NFT] {
  let collection = getAccount(account).getCapability(/public/NFTCollection)
                    .borrow<&NFTStore.Collection{NonFungibleToken.CollectionPublic, NFTStore.CollectionPublic}>()
                    ?? panic("Failed to get user's collection.")
  let res: [&NFTStore.NFT] = []
  let ids = collection.getIDs()
  for id in ids {
    res.append(collection.borrowEntireNFT(id: id))
  }
  return res
}