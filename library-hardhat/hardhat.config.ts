import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.0",
};

export default config;


/* module.exports = {
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/3fb91f45937843c4b9e4b90deaad6ff3",
      accounts: ['3fb91f45937843c4b9e4b90deaad6ff3']
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}; */