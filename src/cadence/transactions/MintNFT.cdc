import NFTStore from 0xNFTStore

transaction(ipfsHash: String, metadata: {String: String}) {
    prepare(acct: AuthAccount) {
        let collection = acct.borrow<&NFTStore.Collection>(from: /storage/NFTCollection)
                            ?? panic("Failed to borrow: collection does not exist in storage")
        metadata.insert(key: "creator", acct.address.toString())
        let nft <- NFTStore.mintToken(ipfsHash: ipfsHash, metadata: metadata)
        collection.deposit(token: <- nft)
    }
    
    execute {
        log("Transaction executed: minted NFT in user account")
    }
}