pragma solidity ^0.4.17;

contract Property {
    uint64 private transactionDate;

    function Property() public {
        transactionDate = uint64(now);
    }

    function getTransactionDate() public view returns (uint64) {
        return transactionDate;
    }
}