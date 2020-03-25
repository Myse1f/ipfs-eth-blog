const BlogStorage = artifacts.require("./BlogStorage.sol");

contract("BlogStorage", accounts => {
  it("...should store the value 89.", async () => {
    const blogStorageInstance = await BlogStorage.deployed();

    // Set value of 89
    await blogStorageInstance.set("Qm123", { from: accounts[0] });

    // Get stored value
    const storedData = await blogStorageInstance.get.call();

    assert.equal(storedData, "Qm123", "The value 89 was not stored.");
  });
});
