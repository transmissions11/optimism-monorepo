/* External Imports */
import { Block, TransactionResponse } from 'ethers/providers'

/* Internal Imports */
import {
  BlockBatches,
  L1Batch,
  RollupTransaction,
  TransactionAndRoot,
} from '../types'
import { L1BatchRecord } from './types'
import { Row } from '@eth-optimism/core-db/build/src'

export interface L1DataService {
  /**
   * Inserts the provided block into the associated RDB.
   *
   * @param block The Block to insert.
   * @param processed Whether or not the Block is completely processed and ready for use by other parts of the system.
   * @throws An error if there is a DB error.
   */
  insertL1Block(block: Block, processed: boolean): Promise<void>

  /**
   * Atomically inserts the provided transactions into the associated RDB.
   *
   * @param transactions The transactions to insert.
   * @throws An error if there is a DB error.
   */
  insertL1Transactions(transactions: TransactionResponse[]): Promise<void>

  /**
   * Atomically inserts the provided block & contained transactions of interest.
   *
   * @param block The block to insert
   * @param txs The transactions to insert (may not be all of the txs in the associated block)
   * @param processed Whether or not the Block is completely processed and ready for use by other parts of the system.
   * @throws An error if there is a DB error.
   */
  insertL1BlockAndTransactions(
    block: Block,
    txs: TransactionResponse[],
    processed: boolean
  ): Promise<void>

  /**
   * Updates the block with the provided block_hash to be marked as "processed," signifying that all data
   * associated with it is present and ready for consumption.
   *
   * @param blockHash The block hash identifying the block to update.
   * @throws An error if there is a DB error.
   */
  updateBlockToProcessed(blockHash: string): Promise<void>

  /**
   * Atomically inserts the provided RollupTransactions, creating a batch for them.
   *
   * @param l1TxHash The L1 Transaction hash.
   * @param rollupTransactions The RollupTransactions to insert.
   * @returns The inserted transaction batch number.
   * @throws An error if there is a DB error.
   */
  insertL1RollupTransactions(
    l1TxHash: string,
    rollupTransactions: RollupTransaction[]
  ): Promise<number>

  /**
   * Atomically inserts the provided State Roots, creating a batch for them.
   *
   * @param l1TxHash The L1 Transaction hash.
   * @param stateRoots The state roots to insert.
   * @returns The inserted state root batch number.
   * @throws An error if there is a DB error.
   */
  insertL1RollupStateRoots(
    l1TxHash: string,
    stateRoots: string[]
  ): Promise<number>

  /**
   * Fetches the next batch from L1 to submit to L2, if there is one.
   *
   * @returns The fetched batch or undefined if one is not present in the DB.
   */
  getNextBatchForL2Submission(): Promise<BlockBatches>

  /**
   * Marks the provided L1 batch as submitted to L2.
   *
   * @params batchNumber The L1 batch number to mark as submitted to L2.
   * @throws An error if there is a DB error.
   */
  markL1BatchSubmittedToL2(batchNumber: number): Promise<void>

  /**
   * Gets the oldest unverified L1 transaction batch.
   *
   * @returns The L1BatchRecord representing the oldest unverified batch
   * @throws An error if there is a DB error.
   */
  getOldestUnverifiedL1TransactionBatch(): Promise<L1BatchRecord>
}