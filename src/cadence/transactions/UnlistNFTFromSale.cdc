import NFTMarketplace from 0xNFTMarketplace

transaction(id: UInt64) {
    prepare(acct: AuthAccount) {
        let saleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/SaleCollection)
                                ?? panic("SaleCollection does not exist in storage")
        saleCollection.unlistNFT(id: id)
    }
    execute {
        log("Transaction executed: unlisted an NFT from Sale")
    }
}