pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BlogStorage.sol";

contract TestBlogStorage {

  function testItStoresAValue() public {
    BlogStorage blogStorage = BlogStorage(DeployedAddresses.BlogStorage());

    blogStorage.set("Qm123");

    string memory expected = "Qm123";

    Assert.equal(blogStorage.get(), expected, "It should store the value 89.");
  }

}
