
// ###################################################################################      Functions for converting uint format to decimal and vice versa
function amount_In_filter(n) {
    return web3.utils.toWei(n.toString(), "ether");
  }
  
  function amount_Out_filter(n) {
    return web3.utils.fromWei(n.toString(), "ether");
  }
  
// ###################################################################################  

const Logger = artifacts.require("Logger");
const Bank = artifacts.require("Bank");
const HoneyPot = artifacts.require("HoneyPot");
const Attack_Honey = artifacts.require("Attack_Honey");

contract("H_5_Honeypot.test.js", () => {

  it("Hacking the contract according the Hacker", async () => {
    const accounts = await web3.eth.personal.getAccounts();
    var victim_contract_balance, victim_account1_balance, victim_account2_balance;

    // Deploy contracts
    const logger = await Logger.new({from: accounts[1]});
    const bank = await Bank.new(logger.address, {from: accounts[1]});

    const attack = await Attack_Honey.new(bank.address, {from: accounts[9]});


    console.log('-------------------------------------------------------------------------------');
    console.log("Check Victim contract balance: ");
    victim_contract_balance = amount_Out_filter(await web3.eth.getBalance(bank.address));
    console.log(`Victim balance:  ${victim_contract_balance}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Deposits into Victim contract: ");
    await bank.deposit({value: amount_In_filter(5), from: accounts[1]});
    await bank.deposit({value: amount_In_filter(1), from: accounts[2]});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Check Victim contract balance & accounts balance:");
    victim_contract_balance = amount_Out_filter(await web3.eth.getBalance(bank.address));
    victim_account1_balance = amount_Out_filter(await bank.balances(accounts[1]));
    victim_account2_balance = amount_Out_filter(await bank.balances(accounts[2]));
    console.log(`Victim balance:  ${victim_contract_balance}`);
    console.log(`Account1 balance: ${victim_account1_balance}`);
    console.log(`Account2 balance: ${victim_account2_balance}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Attack!");
    console.log(`Attack contract balance before attack: ${amount_Out_filter(await attack.getBalance())}`);
    await attack.attack({value: amount_In_filter(1), from: accounts[9]});
    console.log(`Attack contract balance after attack: ${amount_Out_filter(await attack.getBalance())}`);
    console.log(" ");
  
  });

  it("Hacker trap", async () => {
    const accounts = await web3.eth.personal.getAccounts();
    var victim_contract_balance, victim_account1_balance, victim_account2_balance;

    // Deploy contracts
    const honeypot = await HoneyPot.new({from: accounts[1]});
    const bank = await Bank.new(honeypot.address, {from: accounts[1]});

    const attack = await Attack_Honey.new(bank.address, {from: accounts[9]});


    console.log('-------------------------------------------------------------------------------');
    console.log("Check Victim contract balance: ");
    victim_contract_balance = amount_Out_filter(await web3.eth.getBalance(bank.address));
    console.log(`Victim balance:  ${victim_contract_balance}`);


    console.log('-------------------------------------------------------------------------------');
    console.log("Deposits into Victim contract: ");
    await bank.deposit({value: amount_In_filter(5), from: accounts[1]});
    await bank.deposit({value: amount_In_filter(1), from: accounts[2]});

    console.log('-------------------------------------------------------------------------------');
    console.log("Check Victim contract balance & accounts balance:");
    victim_contract_balance = amount_Out_filter(await web3.eth.getBalance(bank.address));
    victim_account1_balance = amount_Out_filter(await bank.balances(accounts[1]));
    victim_account2_balance = amount_Out_filter(await bank.balances(accounts[2]));
    console.log(`Victim balance:  ${victim_contract_balance}`);
    console.log(`Account1 balance: ${victim_account1_balance}`);
    console.log(`Account2 balance: ${victim_account2_balance}`);

    console.log('-------------------------------------------------------------------------------');
    console.log("Attack!");
    console.log(`Attack contract balance before attack: ${amount_Out_filter(await attack.getBalance())}`);
    await attack.attack({value: amount_In_filter(1), from: accounts[9]});
    console.log(`Attack contract balance after attack: ${amount_Out_filter(await attack.getBalance())}`);
    
  
  });

});