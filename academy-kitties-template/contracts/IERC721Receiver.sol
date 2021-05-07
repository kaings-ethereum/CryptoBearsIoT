pragma solidity ^0.5.12;


//THIS IS HOW YOU CREATE AN INTERFACE!!

interface IERC721Receiver{
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata data) external returns (bytes4);
}