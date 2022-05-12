import { ethers } from "hardhat";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
async function main() {
  const ticket = await ethers.getContractAt("Ticket", contractAddress);

  const result = await ticket.verify(
    "0x3c1ba41103ad8dfd70d3fb0406f734e112e73e8739e6102c1abcddac5a28c9a150a7280025ab20a82da069e84ea7787b3b8bdd3617253e4a65f2ed9a67e2c8e11b"
  );
  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
