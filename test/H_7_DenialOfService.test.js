// ###################################################################################      Functions for converting uint format to decimal and vice versa
function amount_In_filter(n) {
    return web3.utils.toWei(n.toString(), "ether");
  }
  
  function amount_Out_filter(n) {
    return web3.utils.fromWei(n.toString(), "ether");
  }
  
  // ###################################################################################  
  

const KingOfEther_Problem = artifacts.require("KingOfEther_Problem");
const Attack_Denial = artifacts.require("Attack_Denial");

contract("H_7_DenialOfService.test.js", () => {
    let Victim;
    let Attack;

  beforeEach(async () => {
    const accounts = await web3.eth.personal.getAccounts();
    Victim = await KingOfEther_Problem.new();
    Attack = await Attack_Denial.new(Victim.address, {from: accounts[9]});
  });

  it("Successful attack", async () => {
    const accounts = await web3.eth.personal.getAccounts();

    console.log('-------------------------------------------------------------------------------');
    console.log("Contract addresses: ");
    console.log(`Victim address: ${Victim.address}`);
    console.log(`Attack address: ${Attack.address}`);
    console.log(" ");


    console.log('-------------------------------------------------------------------------------');
    console.log(`KingOfEther balance:   ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`);
    console.log(`KingOfEther:           ${await Victim.king()}`);  
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("First player")
    await Victim.claimThrone({from: accounts[1], value: amount_In_filter(1)});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`KingOfEther balance:   ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`);
    console.log(`KingOfEther:           ${await Victim.king()}`);  
    console.log(" ");


    console.log('-------------------------------------------------------------------------------');
    console.log("Second playter (Attack!)");
    await Attack.attack({from: accounts[9], value: amount_In_filter(2)});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`KingOfEther balance:   ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`);
    console.log(`KingOfEther:           ${await Victim.king()}`);  
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Third player")
    await Victim.claimThrone({from: accounts[2], value: amount_In_filter(3)});
    console.log(" ");
  
  });

});