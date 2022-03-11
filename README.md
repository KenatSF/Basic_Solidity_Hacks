# Basic Solidity hacks

## Dependencies

* truffle v5.1.55

## Resources

* [Solidity by Example: Re-entrancy](https://solidity-by-example.org/hacks/re-entrancy/)
* [Solidity by Example: Self-destruct](https://solidity-by-example.org/hacks/self-destruct/)
* [Solidity by Example: DelegateCall](https://solidity-by-example.org/hacks/delegatecall/)
* [Solidity by Example: Honeypot](https://solidity-by-example.org/hacks/honeypot/)
* [OpenZeppelin: CodeSize](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)
* [OpenZeppelin: Denial Of Service](https://solidity-by-example.org/hacks/denial-of-service/)



## Testing
Compile contract:
```
truffle compile
```
Before deploy it, you should run in a console:
```
ganache-cli
```
You must check out the compiler version for some contracts at truffle-config.js. You could test all files at once:
```
truffle test
```
Or test file by file:
```
truffle test ./test/file_name.test.js
```