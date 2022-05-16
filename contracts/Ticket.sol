// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";

contract Ticket is EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

  function verify(uint8 v, bytes32 r, bytes32 s) external view returns (address) {
    bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
      keccak256("CheckIn(string event, uint256 tokenId, address attendee)"),
      "Webinar Eseats",
      1,
      msg.sender
    )));

    address signer = ECDSA.recover(digest, v, r, s);
    console.log("signer address %s", signer);
    return signer;
  }

}