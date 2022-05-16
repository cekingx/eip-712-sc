// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";

contract Ticket is EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

  function verify(uint8 v, bytes32 r, bytes32 s) external view returns (address) {
    address signer = ECDSA.recover(digest(), v, r, s);
    console.log("signer address %s", signer);
    return signer;
  }

  function digest() public view returns (bytes32) {
    bytes32 hashed = _hashTypedDataV4(keccak256(abi.encode(
      keccak256("CheckIn(uint256 tokenId)"),
      1
    )));

    return hashed;
  }

  function chainId() external view returns (uint256) {
    return block.chainid;
  }

}