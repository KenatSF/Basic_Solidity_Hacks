

const Flow = artifacts.require("clock");

contract("H_1_OverAndUnderFlow.test.js", () => {
  let flow;

  beforeEach(async () => {
    flow = await Flow.new();
  });

  it("Overflow timestamp", async () => {
    console.log('-------------------------------------------------------------------------------');
    var answer = await flow.attack();
    answer = web3.utils.toAscii(answer);
    console.log(`Message: ${answer}`);

  
  });
});