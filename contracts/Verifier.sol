// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Verifier is EIP712 {

  constructor(string memory name, string memory version) EIP712(name, version) {}

  function verify(address attendee, uint8 v, bytes32 r, bytes32 s) external view returns (address) {
    bytes32 hashed = _hashTypedDataV4(keccak256(abi.encode(
      keccak256("CheckIn(string event, uint256 tokenId, address attendee)"),
      keccak256(bytes("Eseats")),
      1,
      attendee
    )));

    address signer = ECDSA.recover(hashed, v, r, s);
    return signer;
  }
}