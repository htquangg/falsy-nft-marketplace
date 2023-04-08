import { ethers } from "hardhat";

const baseURI =
  "https://ipfs.io/ipfs/QmcmxU24WqUwoFeXrnU1PWYW4BbxwDmKmgprJ3yesxsZLj";
const name = "WeMint Washington Clone";
const symbol = "WASHINGTON";

async function main() {
  const [signer] = await ethers.getSigners();
  const ERC721Collectible = await ethers.getContractFactory(
    "ERC721Collectible",
    {
      signer: signer,
    }
  );

  const washingtonClone = await ERC721Collectible.deploy(name, symbol);
  const receiver = await signer.getAddress();

  console.log(`====== Start Minting ======`);
  for (let index = 1; index <= 10000; index++) {
    await washingtonClone.safeMint(receiver, `${baseURI}/${index}`);
  }
  console.log(`====== End minting ======`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
