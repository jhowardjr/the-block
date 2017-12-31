pragma solidity ^0.4.17;

import "./Property.sol";
import "./PropertyInterface.sol";

contract PropertyFactory { 

    PropertyInterface[] private properties;

    function _create() public returns (uint) {
        // TODO: RANDOMLY CHOOSE PROPERTY TYPE
        PropertyInterface _property = new Property();
        uint256 propertyId = properties.push(_property) - 1;
        return propertyId;
    }

    function _retrieveAt(uint index) public view returns (PropertyInterface) {
        require(index >= 0 && index < _length());
        return properties[index];
    }

    function _length() public view returns (uint) {
        return properties.length;
    }
}