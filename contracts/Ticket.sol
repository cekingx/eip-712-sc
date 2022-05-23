// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Verifier.sol";

contract Ticket {
  Verifier private verifier;

  constructor(address _verifier) {
    verifier = Verifier(_verifier);
  }

  function checkIn(uint8 v, bytes32 r, bytes32 s) external view returns(bool) {
    return msg.sender == verifier.verify(msg.sender, v, r, s);
  } 
}