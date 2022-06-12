const AddTransaksi = artifacts.require("AddTransaksi");

module.exports = function (deployer) {
  deployer.deploy(AddTransaksi);
};
