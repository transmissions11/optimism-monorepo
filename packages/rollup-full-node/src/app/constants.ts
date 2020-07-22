import { ZERO_ADDRESS } from '@eth-optimism/core-utils'

export const L1ToL2TransactionEventName = 'L1ToL2Transaction'
export const L1ToL2TransactionBatchEventName = 'NewTransactionBatchAdded'

export const CREATOR_CONTRACT_ADDRESS = ZERO_ADDRESS
export const GAS_LIMIT = 1_000_000_000
export const DEFAULT_ETHNODE_GAS_LIMIT = 10_000_000

export const CHAIN_ID = 108

export const DEFAULT_OPCODE_WHITELIST_MASK =
  '0x600a0000000000000000001fffffffffffffffff0fcf000063f000013fff0fff'

export const L2_TO_L1_MESSAGE_PASSER_OVM_ADDRESS =
  '0x4200000000000000000000000000000000000000'