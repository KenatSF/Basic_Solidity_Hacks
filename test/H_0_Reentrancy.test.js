

// ###################################################################################      Functions for converting uint format to decimal and vice versa
function amount_In_filter(n) {
  return web3.utils.toWei(n.toString(), "ether");
}

function amount_Out_filter(n) {
  return web3.utils.fromWei(n.toString(), "ether");
}

// ###################################################################################  

const json_victim = artifacts.require("Victim_Reentrancy");
const json_attack = artifacts.require("Attack_Reentrancy");



contract("H_0_Reentrancy.test.js", () => {
  let Victim;
  let Attack;

  beforeEach(async () => {
    const accounts = await web3.eth.personal.getAccounts();
    Victim = await json_victim.new();
    Attack = await json_attack.new(Victim.address, {from: accounts[9]});
    
  });

  it("Reentrancy: ", async () => {
    const accounts = await web3.eth.personal.getAccounts();

    var victim_contract_balance, victim_account1_balance, victim_account2_balance;

    console.log('-------------------------------------------------------------------------------');
    console.log("Accounts: ");
    console.log(accounts);

    console.log('-------------------------------------------------------------------------------');
    console.log("Contract addresses: ");
    console.log(`Victim address: ${Victim.address}`);
    console.log(`Attack address: ${Attack.address}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Check Victim contract balance: ");
    victim_contract_balance = amount_Out_filter(await web3.eth.getBalance(Victim.address));
    console.log(`Victim balance:  ${victim_contract_balance}`);


    console.log('-------------------------------------------------------------------------------');
    console.log("Deposits into Victim contract: ");
    await Victim.deposit({value: amount_In_filter(5), from: accounts[1]});
    await Victim.deposit({value: amount_In_filter(1), from: accounts[2]});

    console.log('-------------------------------------------------------------------------------');
    console.log("Check Victim contract balance & accounts balance:");
    victim_contract_balance = amount_Out_filter(await web3.eth.getBalance(Victim.address));
    victim_account1_balance = amount_Out_filter(await Victim.balances(accounts[1]));
    victim_account2_balance = amount_Out_filter(await Victim.balances(accounts[2]));
    console.log(`Victim balance:  ${victim_contract_balance}`);
    console.log(`Account1 balance: ${victim_account1_balance}`);
    console.log(`Account2 balance: ${victim_account2_balance}`);

    console.log('-------------------------------------------------------------------------------');
    console.log("Attack!");
    console.log(`Attacker's balance before attack: ${amount_Out_filter(await web3.eth.getBalance(accounts[9]))}`);
    await Attack.attack({value: amount_In_filter(1), from: accounts[9]});
    await Attack.withdraw_my_funds({from: accounts[9]});
    console.log(`Attacker's balance after attack: ${amount_Out_filter(await web3.eth.getBalance(accounts[9]))}`);
    
    console.log('-------------------------------------------------------------------------------');
    console.log("Check Victim contract balance & accounts balance:");
    victim_contract_balance = amount_Out_filter(await web3.eth.getBalance(Victim.address));
    victim_account1_balance = amount_Out_filter(await Victim.balances(accounts[1]));
    victim_account2_balance = amount_Out_filter(await Victim.balances(accounts[2]));
    console.log(`Victim balance:  ${victim_contract_balance}`);
    console.log(`Account1 balance: ${victim_account1_balance}`);
    console.log(`Account2 balance: ${victim_account2_balance}`);

  });
});


