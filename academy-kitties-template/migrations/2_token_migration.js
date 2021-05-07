const Token = artifacts.require("CryptoBears");


module.exports = function (deployer, network, accouts) {
  deployer.deploy(Token);
};
