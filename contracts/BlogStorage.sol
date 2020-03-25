pragma solidity >=0.4.21 <0.7.0;

contract BlogStorage {
  string storedHash;
  address public owner;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function set(string memory hash) public restricted {
    storedHash = hash;
  }

  function get() public view returns (string memory hash) {
    return storedHash;
  }
}
