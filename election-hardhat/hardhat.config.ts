import { HardhatUserConfig, subtask, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";


/* const config: HardhatUserConfig = {
  solidity: "0.8.0",
};

export default config; */

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/cbd7a030c41f474ead18fed833b6acab",
      accounts: ['b8d0a4e0592db1c3e01de62ffc39915de38acc4d41b2e2331dcd4eb733d4973f']
    }
  },
  etherscan: {
    apiKey: "ZP5RNZM5HNIMDKYX2QYAAXS8CSU3644CPK",
  },  
};


task("deploy-testnets", "Deploys contract on a provided network")
    .setAction(async () => {
        const deployElectionContract = require("./scripts/deploy-testnets");
        await deployElectionContract();
});

task("deploy-param", "Deploys contract on a provided network")
    .addParam("privateKey", "Please provide the private key")
    .setAction(async ({privateKey}) => {
      const deployElectionContract = require("./scripts/deploy-with-param-task");
      await deployElectionContract(privateKey);
});