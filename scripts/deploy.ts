import { fromRpcSig } from "ethereumjs-util";
import { ethers } from "hardhat";

async function main() {
  const Verifier = await ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy("Eseats", "1");
  await verifier.deployed();
  const Ticket = await ethers.getContractFactory("Ticket");
  const ticket = await Ticket.deploy(verifier.address);
  await ticket.deployed();

  console.log("Verifier deployed to:", verifier.address);
  console.log("Ticket deployed to:", ticket.address);

  const signature =
    "0xd9f4b3cc3db0013eb33099abfe0b3ce84db237521da8b22d9b55c6f63189915408637c3ad81aabce5a5c61fcab5254953e0a9e63ec49845ec2ce908834141ada1c";
  const rsv = fromRpcSig(signature);
  const result = await ticket.checkIn(
    rsv.v,
    "0x" + rsv.r.toString("hex"),
    "0x" + rsv.s.toString("hex")
  );
  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
