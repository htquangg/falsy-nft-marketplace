import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

const baseURI =
  "https://ipfs.io/ipfs/QmcmxU24WqUwoFeXrnU1PWYW4BbxwDmKmgprJ3yesxsZLj";
const name = "WeMint Washington Clone";
const symbol = "WASHINGTON";

describe("Erc721 Collectible", function () {
  async function loadErc721CollectibleFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC721Collectible = await ethers.getContractFactory(
      "ERC721Collectible",
      {
        signer: owner,
      }
    );

    const erc721Collectible = await ERC721Collectible.deploy(name, symbol);

    return { owner, otherAccount, erc721Collectible };
  }

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      const { owner, erc721Collectible } = await loadErc721CollectibleFixture();
      expect(await erc721Collectible.owner()).equal(owner.address);
    });
  });

  describe("Mint NFT", function () {
    it("Should mint successfully", async function () {
      const { owner, erc721Collectible } = await loadErc721CollectibleFixture();

      expect(await erc721Collectible.safeMint(owner.address, `${baseURI}/1`))
        .emit(erc721Collectible, "Transfer")
        .withArgs(erc721Collectible.address, owner.address, 1);
    });
  });
});
