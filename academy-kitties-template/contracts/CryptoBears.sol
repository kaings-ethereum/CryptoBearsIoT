pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

contract CryptoBears is IERC721, Ownable {

    string public constant bearTokenName = "CryptoBears";   //Token Name
    string public constant bearTokenSymbol = "CB";          //Token Symbol
    uint256 public constant CREATION_LIMIT_GEN0 = 10;
    
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    struct Bear {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Bear[] bears;

    //Mappings
    
    mapping(address => uint256) tokenOwnershipCount; //Token owners balance
    mapping(uint256 => address) public tokenIdOwnerMapping; //Maps TokenId to owners address

    mapping(uint256 => address) public tokenIdToApproved; //Points from tokenId to approved address! For giving permission for one specific token!
    mapping(address => mapping(address => bool)) private _operatorApprovals; //first key = owner, second key = operator, bool shows if operator is approved. Operator can manage ALL tokens!

    event Birth(address owner, uint256 bearId, uint256 mumId, uint256 dadId, uint256 genes);

    uint256 public gen0Counter;

    constructor() public {
        _createBear(0, 0, 0, uint256(-1), address(0));
    }

    function breed(uint256 _dadId, uint256 _momId) public returns(uint256){
        require(_owns(msg.sender, _dadId) && _owns(msg.sender, _momId), "You must own both bears to breed them!");
        
        //get newDna from _mixDna
        uint256 newGenes = _mixDna(bears[_dadId].genes, bears[_momId].genes); 

        //Generation determination
        uint256 newGen;
        if(bears[_momId].generation == bears[_dadId].generation){
            newGen = bears[_momId].generation++;
        }
        else if (bears[_momId].generation < bears[_dadId].generation)
        {
            newGen = bears[_momId].generation++;
        }
        else{
            newGen = ((bears[_momId].generation + bears[_dadId].generation) / 2) + 1;
        }

        //Create new bear and transfer to msg.sender
        _createBear(_momId, _dadId, newGen, newGenes, msg.sender);


    }

    function supportsInterface(bytes4 _interfaceId) external pure returns(bool){
        return ( _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165 );
    }

    //safeTransferFrom ERC721 Specification, without data
       function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
           safeTransferFrom(_from, _to, _tokenId, "");
       }
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public {

        require(msg.sender == _from || msg.sender == tokenIdToApproved[_tokenId] || isApprovedForAll(_from, msg.sender), "Only Owner, Operator or Approved Addresses can transfer!");
        require(_owns(_from, _tokenId), "Owner address is not connected to this token!");
        require(_to != address(0), "Transfer to zero-address is not possible!");
        require(_tokenId < bears.length, "This token does not exist!");

        _safeTransfer(_from, _to, _tokenId, _data);
    }
  
    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require( _checkERC721Support(_from, _to, _tokenId, _data) );
    }

    //Transfers Ownership of a Token
    function transferFrom(address _from, address _to, uint256 _tokenId) external{

        require(msg.sender == _from || msg.sender == tokenIdToApproved[_tokenId] || isApprovedForAll(_from, msg.sender), "Only Owner, Operator or Approved Addresses can transfer!");
        require(_owns(_from, _tokenId), "Owner address is not connected to this token!");
        require(_to != address(0), "Transfer to zero-address is not possible!");
        require(_tokenId < bears.length, "This token does not exist!");

        _transfer(_from, _to, _tokenId);
    }

    //Setter Approve operators!
    function setApprovalForAll(address _operator, bool _approved) external{
        require(_operator != msg.sender, "Operator address cannot be owner!");
        _setApprovalForAll(_operator, _approved);
   
    }

    function _setApprovalForAll(address _operator, bool _approved) private{

        _operatorApprovals[msg.sender][_operator] = _approved;

        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    //Setter for single token approval!
    function approve(address _approved, uint256 _tokenId) external {
        require(_owns(msg.sender, _tokenId), "This can only be called from owners or operators!");

        _approve(_approved, _tokenId);

        emit Approval(msg.sender, _approved, _tokenId);

    }

    function _approve(address _approved, uint256 _tokenId) private {

            tokenIdToApproved[_tokenId] = _approved;
        }

    //Getter single Token Approvals
    function getApproved(uint256 _tokenId) external view returns (address){
        require(_tokenId < bears.length, "Not a valid token ID!");
        return tokenIdToApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view returns (bool){
        return _operatorApprovals[_owner][_operator];

    }

    //Getter function for Token
    function getBear(uint256 _tokenId) external view returns(
        uint256 genes, 
        uint256 birthTime, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 generation
        ) {
        return (bears[_tokenId].genes, 
                uint256(bears[_tokenId].birthTime), 
                uint256(bears[_tokenId].mumId), 
                uint256(bears[_tokenId].dadId), 
                uint256(bears[_tokenId].generation)
                );
    }

    //Mint a gen0 Token
    function createBearGen0(uint256 _genes) public OnlyOwner returns(uint256) {
        require(gen0Counter < CREATION_LIMIT_GEN0, "Creation limit reached!");

        gen0Counter++;

        return _createBear(0, 0, 0, _genes, msg.sender);
    }


    function _createBear(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns(uint256) {
        Bear memory _bear = Bear({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        uint256 newBearId = bears.push(_bear) - 1;  //push function returns array length! to get id -1 because 0-indexed

        emit Birth(_owner, newBearId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newBearId);

        return newBearId;
        
    }

    //Getter function balanceOf
     function balanceOf(address owner) external view returns (uint256 balance){
         return tokenOwnershipCount[owner];
     }

    //Getter totalSupply
      function totalSupply() public view returns (uint256 total){
          return bears.length;
      }

    //Getter Token Name
      function name() external view returns (string memory tokenName){
          return bearTokenName;
      }

    //Getter Token Symbol
    function symbol() external view returns (string memory tokenSymbol){
        return bearTokenSymbol;
    }

    //Getter Owner of Token
     function ownerOf(uint256 tokenId) external view returns (address owner){
        return tokenIdOwnerMapping[tokenId];
     }

     function transfer(address to, uint256 _tokenId) external {
         require(_owns(msg.sender, _tokenId), "You are not the owner of this token!");
         require(to != address(0), "You cannot send tokens to this address!");
         require(to != address(this), "You cannot send tokens to this address!");

         _transfer(msg.sender, to, _tokenId);

         
     }

     function _transfer(address _from, address _to, uint256 _tokenId) internal {
            tokenOwnershipCount[_to]++;

            tokenIdOwnerMapping[_tokenId] = _to;

            if(_from != address(0)){
                tokenOwnershipCount[_from]--;
                delete tokenIdToApproved[_tokenId];
            }

            emit Transfer(_from, _to, _tokenId);
     }

     function _owns(address _claimant, uint256 _tokenId) public view returns(bool) {
         return tokenIdOwnerMapping[_tokenId] == _claimant;
     }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns(bool) {
        if( !_isContract(_to) ){
            return true;
        }

        //call onERC721Received in _to contract, 
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
          
        //check the return value 
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    function _isContract(address _to) internal view returns(bool){
        uint32 size;
        assembly{
            size := extcodesize(_to)  //Solidity Assembly function to GET code size for a given address!
        }
        return size > 0;
    }

    function _mixDna(uint256 _dadDna, uint256 _momDna) internal view returns(uint256){
        uint256[8] memory geneArray;
        uint8 random = uint8( block.timestamp % 255 );  //gives binary between 00000000 and 11111111
        uint256 i = 1;
        uint256 index = 7;
        for(i = 1; i <= 128; i=i*2 ){
            if(random & i != 0){
                geneArray[index] = uint8(_momDna % 100);
            }
            else{
                geneArray[index] = uint8(_dadDna % 100);
            }
            _momDna = _momDna / 100;
            _dadDna = _dadDna / 100;

            index = index - 1;

            //We have to work with bitwise operators:  
            //1, 2, 4, 8, 16, 32, 64, 128
            //1 =   00000001
            //2 =   00000010
            //4 =   00000100
            //8 =   00001000
            //16 =  00010000
            //32 =  00100000
            //64 =  01000000
            //128=  10000000
            // & is bitwise Operator
        } //End of Loop

        uint256 newGene;
        for (i = 0; i < 8; i++){
            newGene = newGene + geneArray[i];
            if(i != 7){
                 newGene = newGene * 100;
            }
           

            /*
            Imagine a DNA ARRAY! like this [11, 22, 33, 44, 55, 66, 77, 88]
            to make single number out of it, we say newNumber + 11, 
            then 11 * 100 = 1100, then newNumber, which now is 1100, + 22 = 1122
            then 1122 * 100 = 112200, then + 33 = 112233, ...
            .
            .
            .
            and so on till we have 1122334455667788 as one single number! 
            Clever stuff!
            */
        }//End of Loop

        return newGene;


        
        
        //Simple DNA MIXING
        // uint256 dadHalf = _dadDna / 100000000;
        // uint256 momHalf = _momDna % 100000000;
        // uint256 newDna = (dadHalf * 100000000) + momHalf;
        // return newDna;
    }

    function getBearsLength() public returns(uint256){
        return bears.length;
    }

}

