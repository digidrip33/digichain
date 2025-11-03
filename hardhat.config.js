require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: ["BURAYA_SENIN_PRIVATE_KEY"], // MetaMask → Export
      chainId: 421614
    }
  }
};
