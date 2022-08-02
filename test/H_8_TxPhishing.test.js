

// ###################################################################################      Functions for converting uint format to decimal and vice versa
function amount_In_filter(n) {
    return web3.utils.toWei(n.toString(), "ether");
  }
  
  function amount_Out_filter(n) {
    return web3.utils.fromWei(n.toString(), "ether");
  }
  
  // ###################################################################################  
  
  const json_victim = artifacts.require("HackmePhishing");
  const json_attack = artifacts.require("AttackerPhishing");
  
  
  
  contract("H_8_TxPhishing.test.js", () => {
    let Victim;
    let Attack;
  
    beforeEach(async () => {
      const accounts = await web3.eth.personal.getAccounts();
      const victimOwner = accounts[0];
      const attackOwner = accounts[9];
      Victim = await json_victim.new(victimOwner, {value: amount_In_filter(5)});
      Attack = await json_attack.new(attackOwner, Victim.address);
      
    });
  
    it("Unsuccessful Attack: ", async () => {
      const accounts = await web3.eth.personal.getAccounts();
      const victimOwner = accounts[0];
      const attackOwner = accounts[9];
  
      var victim_contract_balance, victim_balance, attacker_contract_balance, attacker_balance;

  
      console.log('-------------------------------------------------------------------------------');
      console.log("Unsuccessful | Contract addresses: ");
      console.log(`Victim address: ${Victim.address}`);
      console.log(`Attack address: ${Attack.address}`);
      console.log(" ");
  
      console.log('-------------------------------------------------------------------------------');
      console.log("Unsuccessful | Checking balances: ");
      victim_contract_balance = amount_Out_filter(await Victim.getBalance());
      victim_balance = amount_Out_filter(await web3.eth.getBalance(victimOwner));
      attacker_contract_balance = amount_Out_filter(await Attack.getBalance());
      attacker_balance = amount_Out_filter(await web3.eth.getBalance(attackOwner));  
      
      console.log(`Victim contract balance:  ${victim_contract_balance}`);
      console.log(`Victim balance:  ${victim_balance}`);
      console.log(`Attack contract balance:  ${attacker_contract_balance}`);
      console.log(`Attack balance:  ${attacker_balance}`);
  
      console.log('-------------------------------------------------------------------------------');
      console.log("Unsuccessful | Attack: ");
      await Attack.attack({from: attackOwner})
  
      console.log('-------------------------------------------------------------------------------');
      console.log("Unsuccessful | Checking balances: ");
      victim_contract_balance = amount_Out_filter(await Victim.getBalance());
      victim_balance = amount_Out_filter(await web3.eth.getBalance(victimOwner));
      attacker_contract_balance = amount_Out_filter(await Attack.getBalance());
      attacker_balance = amount_Out_filter(await web3.eth.getBalance(attackOwner));  
      
      console.log(`Victim contract balance:  ${victim_contract_balance}`);
      console.log(`Victim balance:  ${victim_balance}`);
      console.log(`Attack contract balance:  ${attacker_contract_balance}`);
      console.log(`Attack balance:  ${attacker_balance}`);
  
    });

    it("Successful Attack: ", async () => {
        const accounts = await web3.eth.personal.getAccounts();
        const victimOwner = accounts[0];
        const attackOwner = accounts[9];
    
        var victim_contract_balance, victim_balance, attacker_contract_balance, attacker_balance;
  
    
        console.log('-------------------------------------------------------------------------------');
        console.log("Successful | Contract addresses: ");
        console.log(`Victim address: ${Victim.address}`);
        console.log(`Attack address: ${Attack.address}`);
        console.log(" ");
    
        console.log('-------------------------------------------------------------------------------');
        console.log("Successful | Checking balances: ");
        victim_contract_balance = amount_Out_filter(await Victim.getBalance());
        victim_balance = amount_Out_filter(await web3.eth.getBalance(victimOwner));
        attacker_contract_balance = amount_Out_filter(await Attack.getBalance());
        attacker_balance = amount_Out_filter(await web3.eth.getBalance(attackOwner));  
        
        console.log(`Victim contract balance:  ${victim_contract_balance}`);
        console.log(`Victim balance:  ${victim_balance}`);
        console.log(`Attack contract balance:  ${attacker_contract_balance}`);
        console.log(`Attack balance:  ${attacker_balance}`);
    
        console.log('-------------------------------------------------------------------------------');
        console.log("Successful | Attack: ");
        // Somehow make the Victim contract's Owner send some ETH amount (Even a small amount is enough) to our Phishing contract'address.
        await web3.eth.sendTransaction({ from: victimOwner, to: Attack.address, value: amount_In_filter(0.01) });

        // Note: The victim'balance will be shown less because another contract will be deploy plus 6 ETH more.
    
        console.log('-------------------------------------------------------------------------------');
        console.log("Successful | Checking balances: ");
        victim_contract_balance = amount_Out_filter(await Victim.getBalance());
        victim_balance = amount_Out_filter(await web3.eth.getBalance(victimOwner));
        attacker_contract_balance = amount_Out_filter(await Attack.getBalance());
        attacker_balance = amount_Out_filter(await web3.eth.getBalance(attackOwner));  
        
        console.log(`Victim contract balance:  ${victim_contract_balance}`);
        console.log(`Victim balance:  ${victim_balance}`);
        console.log(`Attack contract balance:  ${attacker_contract_balance}`);
        console.log(`Attack balance:  ${attacker_balance}`);
    
    });
  });
  
  
  