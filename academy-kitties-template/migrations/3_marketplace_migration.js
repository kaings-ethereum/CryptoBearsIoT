const Token = artifacts.require("CryptoBears");
const Marketplace = artifacts.require("Marketplace");

module.exports = function (deployer, network, accouts) {
  deployer.deploy(Marketplace, Token.address);
};
