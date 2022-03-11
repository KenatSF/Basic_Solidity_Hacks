const Target = artifacts.require("Target");
const FailedAttack = artifacts.require("FailedAttack");
const Hack_CodeSize = artifacts.require("Hack_CodeSize");

contract("H_6_CodeSize.test.js", () => {
    let Victim;
    let Failed_attacker;

  beforeEach(async () => {
    const accounts = await web3.eth.personal.getAccounts();
    Victim = await Target.new();
    Failed_attacker = await FailedAttack.new({from: accounts[9]});
  });

  it("Fail attack", async () => {
    const accounts = await web3.eth.personal.getAccounts();

    console.log('-------------------------------------------------------------------------------');
    console.log(`Target contract, variable: ${await Victim.variable()}`);
    console.log(" ");
    
    console.log('-------------------------------------------------------------------------------');
    console.log("Attack! ");
    await Failed_attacker.attack(Victim.address, {from: accounts[9]});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`Target contract, variable: ${await Victim.variable()}`);
    console.log(" ");
  
  });

  it("Successful attack", async () => {
    const accounts = await web3.eth.personal.getAccounts();

    console.log('-------------------------------------------------------------------------------');
    console.log(`Target contract, variable: ${await Victim.variable()}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Attack! ");
    const Attacker = await Hack_CodeSize.new(Victim.address, {from: accounts[9]});
    console.log(`Hack_CodeSize contract address: ${Attacker.address}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`Target contract, variable: ${await Victim.variable()}`);
    console.log(" ");
  
  });

});