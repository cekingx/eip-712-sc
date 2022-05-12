// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Ticket is EIP712 {
  using ECDSA for bytes32;

  constructor(string memory name, string memory version) EIP712(name, version) {}

  function verify(bytes32 signature) external view returns (address) {
    bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
      keccak256("CheckIn(string event, uint256 tokenId, address attendee)"),
      "Webinar Eseats",
      1,
      msg.sender
    )));

    address signer = digest.recover(digest, signature);
    return signer;
  }

}