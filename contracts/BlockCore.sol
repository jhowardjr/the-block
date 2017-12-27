pragma solidity ^0.4.17;

contract BlockCore { 

    mapping(address => uint) private deeds;

    function _assign(address owner, uint propertyId) public {
        deeds[owner] = propertyId;
    }
}