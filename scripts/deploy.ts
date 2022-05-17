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
    "0xb29b646f267bef76ea1978af21fb8704b9211cffc30a96f44a6f6ba3254672d952b8c1f61fa92c4625976258832bb65a25be3a5d7af10b44cea6f06fbb5d0b3c1c";
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
