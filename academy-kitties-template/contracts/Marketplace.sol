pragma solidity ^0.5.12;


import "./CryptoBears.sol";
import "./IMarketplace.sol";
import "./Ownable.sol";


contract Marketplace is Ownable, IMarketPlace{

    CryptoBears private _cryptoBears;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] offers;

    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    mapping (uint256 => Offer) tokenIdToOffer;

    constructor (address _bearsContractAddress) public {
        setBearContract(_bearsContractAddress);
    }

    //Sets address for tokenContract and initializes it
    function  setBearContract(address _bearsContractAddress) public OnlyOwner {
       _cryptoBears = CryptoBears(_bearsContractAddress);
    }

    function getOffer(uint256 _tokenId) 
        public 
        view 
        returns
    (
        address seller, 
        uint256 price,
        uint256 index,
        uint256 tokenId,
        bool active
    ) {
        Offer storage offer = tokenIdToOffer[_tokenId];

        return (
            offer.seller, 
            offer.price, 
            offer.index, 
            offer.tokenId, 
            offer.active
        );
    }

    function getAllTokenOnSale() public returns(uint256[] memory listOfOffers){

        uint256 totalOffers = offers.length; //Gets total number of offers

        if(offers.length == 0){
            return new uint256[](0);
        } else {

            uint256[] memory result = new uint256[](totalOffers);

            uint256 offerId;

            for (offerId = 0; offerId < totalOffers; offerId++){
                if(offers[offerId].active){
                    result[offerId] = offers[offerId].tokenId;
                }
            } 
            return result;
        }
    } //End of getAllTokenOnSale()

    function _ownsBears(address _address, uint256 _tokenId) 
        internal
        view
        returns ( bool )
    {
            return (_cryptoBears.ownerOf(_tokenId) == _address);
    }

    function setOffer(uint256 _price, uint256 _tokenId) public {
        require(
            _ownsBears(msg.sender, _tokenId), 
            "You must own the bear you want to sell!"
        );
        require(tokenIdToOffer[_tokenId].active == false, "You cannot sell the same bear twice!");
        require(_cryptoBears.isApprovedForAll(msg.sender, address(this)), "The Token Contract does not have permission to transfer your tokens!");

        Offer memory _offer = Offer({
            seller: msg.sender,
            price: _price,
            index: offers.length,
            tokenId: _tokenId,
            active: true
        });

        tokenIdToOffer[_tokenId] = _offer;
        offers.push(_offer);

        emit MarketTransaction("Create Offer", msg.sender, _tokenId);
    }

    function removeOffer(uint256 _tokenId) public {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(
            offer.seller == msg.sender, "Only seller can remove Bear from sale!"
        );
       

        delete offer;
        offers[offer.index].active = false;

        emit MarketTransaction("Remove Offer", msg.sender, _tokenId);
    }

    function buyBear(uint256 _tokenId) public payable {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(msg.value == offer.price, "Incorrect price!");
        require(tokenIdToOffer[_tokenId].active == true, "Bear is not on sale currently!");

        delete offer;
        offers[offer.index].active == false;

        if (offer.price > 0){
            offer.seller.transfer(offer.price);
        }

        _cryptoBears.transferFrom(offer.seller, msg.sender, _tokenId);

        emit MarketTransaction("Bear Sale", msg.sender, _tokenId);
    }


    
    
}