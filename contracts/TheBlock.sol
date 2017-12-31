pragma solidity ^0.4.17;

import "./BlockCore.sol";
import "./PropertyFactory.sol";
import "./Property.sol";
import "./PropertyInterface.sol";

contract TheBlock { 
    BlockCore private core;
    PropertyFactory private factory;
    uint256 public constant PROMO_LIMIT = 10;
    uint256 public constant GENESIS_LIMIT = 50000;
    uint256 private genesisCount;

    function TheBlock() public {
      core = new BlockCore();
      factory = new PropertyFactory();
      genesisCount = 0;
    }
    
    // limit use to only certain account
    function createGenesisBlock() public {
        require(genesisCount < GENESIS_LIMIT);
        factory._create();
        genesisCount++;
    }

    // ran only once and limit use to only certain account
    function genesis() public {
        require(genesisCount < PROMO_LIMIT);
        for (uint i = 0; i < PROMO_LIMIT; i++) {
            createGenesisBlock();
        }
    }

    function retrieveAt(uint index) public view returns (PropertyInterface) {
        return factory._retrieveAt(index);
    }

    function length() public view returns (uint) {
        return factory._length();
    }
}