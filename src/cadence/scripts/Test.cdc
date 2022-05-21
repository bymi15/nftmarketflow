pub fun main(account: Address): [UInt64] {
  let tokenIDs = getAccount(account).getCapability(/public/MomentCollection).getIDs()
  return tokenIDs
}
