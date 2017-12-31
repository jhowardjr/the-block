pragma solidity ^0.4.17;

import "./PropertyInterface.sol";

contract Property is PropertyInterface {
    uint64 private _transactionDate;
    string private _name;
    
    function Property() public {
        _transactionDate = uint64(now);
         // TODO: RANDOMLY GENERATE PROPERTY NAME
         // BASED ON TYPE
        _name = "something random";
    }

    function getAttributes() public view returns (string name, uint64 transactionDate) {
        name = _name;
        transactionDate = _transactionDate;
    }
}