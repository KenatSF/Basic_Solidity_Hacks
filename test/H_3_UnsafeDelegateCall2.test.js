

const Lib = artifacts.require("Lib2");
const HackMe = artifacts.require("HackMe2");
const Attack = artifacts.require("Attack_UnsafeDelegateCall2");

contract("H_3_UnsafeDelegateCall2.test.js", () => {
    let lib;
    let hackme;
    let attack;

  beforeEach(async () => {
    const accounts = await web3.eth.personal.getAccounts();
    lib = await Lib.new();
    hackme = await HackMe.new(lib.address);
    attack = await Attack.new(hackme.address, {from: accounts[9]});
  });

  it("Hacking the contract", async () => {
    const accounts = await web3.eth.personal.getAccounts();

    console.log('-------------------------------------------------------------------------------');
    console.log("Contract addresses: ");
    console.log(`Lib address:     ${lib.address}`);
    console.log(`HackMe address:  ${hackme.address}`)
    console.log(`Attack address:  ${attack.address}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Checking contracts owners: ");
    console.log(`HackMe owner:  ${await hackme.owner()}`);
    console.log(`Attack owner:  ${await attack.owner()}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Attack! ");
    await attack.attack({from: accounts[9]});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Checking contracts owners: ");
    console.log(`HackMe owner:  ${await hackme.owner()}`);
    console.log(`Attack owner:  ${await attack.owner()}`);
    console.log(" ");
  
  });

});