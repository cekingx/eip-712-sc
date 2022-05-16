// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Ticket = await ethers.getContractFactory("Ticket");
  const ticket = await Ticket.deploy("Eseats", "1");

  await ticket.deployed();

  console.log("Ticket deployed to:", ticket.address);

  const result = await ticket.verify(
    27,
    "0x3c1ba41103ad8dfd70d3fb0406f734e112e73e8739e6102c1abcddac5a28c9a1",
    "0x50a7280025ab20a82da069e84ea7787b3b8bdd3617253e4a65f2ed9a67e2c8e1"
  );
  console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
