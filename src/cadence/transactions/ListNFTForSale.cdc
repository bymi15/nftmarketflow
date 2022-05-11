import NFTMarketplace from 0xNFTMarketplace

transaction(id: UInt64, price: UFix64) {
    prepare(acct: AuthAccount) {
        let saleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/SaleCollection)
                                ?? panic("The sale collection does not exist in storage")
        saleCollection.listNFT(id: id, price: price)
    }

    execute {
        log("Transaction executed: user listed NFT for sale")
    }
}