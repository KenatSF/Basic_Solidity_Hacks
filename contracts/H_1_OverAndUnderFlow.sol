// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;   
//pragma solidity ^0.7.6;                                     // This code works up to < 0.8.0                            


contract clock {

    function attack() public view returns (bytes32) {
        uint t = block.timestamp + 600;                     // Actual time plus 10 minutes
        uint x = type(uint).max + 1 - t;
        uint overflow = t + x;                              // We get 0
        //uint overflow = t + 10;

        uint actual_time = block.timestamp;

        if( actual_time > overflow ){
            return bytes32("Overflow!");
        }
        if(overflow > actual_time ) {
            return bytes32("Not Overflow");
        }

        return bytes32("Nothing!");
        /*
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        // timeLock.increaseLockTime(
        //     type(uint).max + 1 - timeLock.lockTime(address(this))
        // );
        // timeLock.withdraw();
    }

    function mayor_t() public pure returns (uint8) {
        return type(uint8).max + 1;                             // Getting the maximum posible number and add it 1, ie, returns 0
    }
    function mayor_s() public pure returns (uint8) {
        return ~uint8(0) + 1;                                   // returns 0
    }

}

