// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { fromRpcSig } from "ethereumjs-util";

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
  console.log("chainid", await ticket.chainId());

  const signature =
    "0xbac6cad9007afcd56738fe2e90d7c78754c43a127fc4f31aec3082628c5f4573401e96b05bfcc5523af351981da3eea548297b0a4756fc0007f7b32f5aedd2721b";
  const rsv = fromRpcSig(signature);
  const result = await ticket.verify(
    rsv.v,
    "0x" + rsv.r.toString("hex"),
    "0x" + rsv.s.toString("hex")
  );
  console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
