import NonFungibleToken from 0xNonFungibleToken
import NFTStore from 0xNFTStore
import FlowToken from 0xFlowToken
import NFTMarketplace from 0xNFTMarketplace

transaction(account: Address, id: UInt64) {
    prepare(acct: AuthAccount) {
        let saleCollection = getAccount(account).getCapability(/public/SaleCollection)
                        .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
                        ?? panic("Failed to borrow user's SaleCollection")
        let recipientCollection = getAccount(acct.address).getCapability(/public/NFTCollection) 
                        .borrow<&NFTStore.Collection{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Failed to get User's collection.")
        let price = saleCollection.getPrice(id: id)
        let payment <- acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: price) as! @FlowToken.Vault
        saleCollection.purchaseNFT(id: id, recipientCollection: recipientCollection, payment: <- payment)
    }
    
    execute {
        log("Transaction executed: purchased NFT")
    }
}