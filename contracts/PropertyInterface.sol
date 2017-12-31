pragma solidity ^0.4.17;

interface PropertyInterface {
     // CAN'T RETURN STRUCTS
     function getAttributes() public view returns (string name, uint64 transactionDate);
}