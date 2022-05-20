
import TopShot from 0x0b2a3299cc857e29
import AllDay from 0xe4cf4bdc1751c65d
import UFC_NFT from 0x329feb3ab062d289
import Gaia from 0x8b148183c28ff88f
import MatrixWorldVoucher from 0x0d77ec47bbad8ef6

pub fun main(project: String): UInt64 {
    switch project {
    case "TopShot":
        return TopShot.totalSupply
    case "AllDay":
        return AllDay.totalSupply
    case "UFC_NFT":
        return UFC_NFT.totalSupply
    case "Gaia":
        return Gaia.totalSupply
    case "MatrixWorldVoucher":
        return MatrixWorldVoucher.totalSupply
    default:
        return 0
    }
}