var Tcoin = artifacts.require("./Tcoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Tcoin);
};
