pragma solidity ^0.5.12;

contract Ownable{

    address private owner;

    event ownerSet(address owner);

      modifier OnlyOwner() {
        require(msg.sender == owner, "This is only executable by the owner!");
        _;
    }

    constructor() public {
        owner = msg.sender;
        emit ownerSet(owner);
    }

  

}