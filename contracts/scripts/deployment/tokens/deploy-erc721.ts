import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();

  const ERC721Collectible = await ethers.getContractFactory(
    "ERC721Collectible",
    {
      signer: signer,
    }
  );

  const name = "Non Fungible Token";
  const symbol = "NFT";

  const erc721Collectible = await ERC721Collectible.deploy(name, symbol);

  console.log(
    `Deploy collectible ${name} successfully at address ${erc721Collectible.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
