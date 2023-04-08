import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  gasReporter: {
    outputFile: "gas-report.txt",
    enabled: true,
    currency: "USD",
    noColors: true,
    token: "ETH",
    coinmarketcap: process.env.COINMARKETCAP_APIKEY || "",
  },
  networks: {
    eth: {
      url: process.env.ETH_RPC_URL,
      accounts: [],
    },
    bsc: {
      url: process.env.BSC_RPC_URL,
      accounts: [],
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [],
    },
  },
};

export default config;
