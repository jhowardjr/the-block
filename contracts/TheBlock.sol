pragma solidity ^0.4.17;

import "./BlockCore.sol";
import "./PropertyFactory.sol";
import "./Property.sol";

contract TheBlock { 
    BlockCore private core;
    PropertyFactory private factory;
    uint256 private genesisCount;
    uint256 public constant GENESIS_LIMIT = 50000;
    
    function TheBlock() public {
      core = new BlockCore();
      factory = new PropertyFactory();
      genesisCount = 0;
    }
    
    function createGenesisBlock() external {
        require(genesisCount < GENESIS_LIMIT);
        factory._create();
        genesisCount++;
    }

    function retrieveAt(uint index) public view returns (Property) {
        return factory._retrieveAt(index);
    }

    function length() public view returns (uint) {
        return factory._length();
    }
}