var BlogStorage = artifacts.require("./BlogStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(BlogStorage)
  .then((b) => b.set("bafyreia7no5nnyltbtnthadkzpwbx3un5yxpuwdofyi3ljbbijubwmqkfu") );
  // the dag node is :
  // {  
  //    posts: []
  // }
};
