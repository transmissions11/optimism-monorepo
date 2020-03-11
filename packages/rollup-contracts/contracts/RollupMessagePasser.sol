pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

/* Internal Imports */
import {DataTypes as dt} from "./DataTypes.sol";

contract RollupMessagePasser {
    event L1ToL2Message(
        address _sender,
        address _target,
        bytes callData
    );

    function passMessageToRollup(address ovmEntrypoint, bytes memory ovmCalldata) public {
        // TODO: Actually create/enqueue a rollup block with this message.  We are simply mocking this functionality for now.
        emit L1ToL2Message(
            msg.sender,
            ovmEntrypoint,
            ovmCalldata
        );
    }
}