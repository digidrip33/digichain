const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // DGC Token
  const DGC = await hre.ethers.getContractFactory("DGC");
  const dgc = await DGC.deploy();
  await dgc.waitForDeployment();
  console.log("DGC deployed to:", dgc.target);

  // DEX Factory
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();
  console.log("DEX Factory:", factory.target);

  // DigiMine
  const DigiMine = await hre.ethers.getContractFactory("DigiMine");
  const digiMine = await DigiMine.deploy(dgc.target);
  await digiMine.waitForDeployment();
  console.log("DigiMine:", digiMine.target);

  // DGC/ETH Pair
  await factory.createPair(dgc.target, "0x4200000000000000000000000000000000000006"); // WETH Sepolia
  console.log("DGC/ETH pair created!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
