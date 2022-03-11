
// ###################################################################################      Functions for converting uint format to decimal and vice versa
function amount_In_filter(n) {
    return web3.utils.toWei(n.toString(), "ether");
  }
  
  function amount_Out_filter(n) {
    return web3.utils.fromWei(n.toString(), "ether");
  }
  
// ###################################################################################  

const Guess = artifacts.require("GuessTheRandomNumber");
const Attack_ForceETH = artifacts.require("Attack_Ramdomness");

contract("H_4_Ramdomness.test.js", () => {
    let Victim;
    let Attack;

  beforeEach(async () => {
    const accounts = await web3.eth.personal.getAccounts();
    Victim = await Guess.new({value: amount_In_filter(1)});
    Attack = await Attack_ForceETH.new(Victim.address, {from: accounts[9]});
  });

  it("Hacking the contract", async () => {
    const accounts = await web3.eth.personal.getAccounts();

    console.log('-------------------------------------------------------------------------------');
    console.log(`Contract Attack balance: ${amount_Out_filter(await Attack.getBalance({from: accounts[9]}))}`);
    console.log(" ");
    
    console.log('-------------------------------------------------------------------------------');
    console.log("Hacking Victim contract! ");
    await Attack.attack(Victim.address, {from: accounts[9]});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`Contract Attack balance: ${amount_Out_filter(await Attack.getBalance({from: accounts[9]}))}`)
    console.log(" ");
  
  });

});