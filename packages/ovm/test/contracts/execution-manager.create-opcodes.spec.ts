import '../setup'

/* External Imports */
import { createMockProvider, deployContract, getWallets } from 'ethereum-waffle'
import { getLogger, remove0x } from '@pigi/core-utils'
import * as ethereumjsAbi from 'ethereumjs-abi'
import { Contract, ContractFactory } from 'ethers'

/* Contract Imports */
import * as ExecutionManager from '../../build/contracts/ExecutionManager.json'
import * as SimpleStorage from '../../build/contracts/SimpleStorage.json'
import * as PurityChecker from '../../build/contracts/PurityChecker.json'

const log = getLogger('execution-manager-create', true)

/*********
 * TESTS *
 *********/

describe('ExecutionManager -- Create opcodes', () => {
  const provider = createMockProvider()
  const [wallet] = getWallets(provider)
  let executionManager: Contract
  let purityChecker: Contract
  let deployTx
  // Useful constants
  const ONE_FILLED_BYTES_32 = '0x' + '11'.repeat(32)
  const TWO_FILLED_BYTES_32 = '0x' + '22'.repeat(32)

  /* Link libraries before tests */
  before(async () => {
    purityChecker = await deployContract(
      wallet,
      PurityChecker,
      [ONE_FILLED_BYTES_32],
      { gasLimit: 6700000 }
    )
  })

  /* Deploy contracts before each test */
  beforeEach(async () => {
    // Deploy the execution manager
    executionManager = await deployContract(
      wallet,
      ExecutionManager,
      [purityChecker.address, '0x' + '00'.repeat(20)],
      { gasLimit: 6700000 }
    )
    deployTx = new ContractFactory(
      SimpleStorage.abi,
      SimpleStorage.bytecode
    ).getDeployTransaction(executionManager.address)
  })

  /*
   * Test CREATE opcode
   */
  describe('ovmCREATE', async () => {
    it('does not throw when passed bytecode', async () => {
      const methodId: string = ethereumjsAbi
        .methodID('ovmCREATE', [])
        .toString('hex')

      const data = `0x${methodId}${remove0x(deployTx.data)}`

      // Now actually apply it to our execution manager
      const result = await executionManager.provider.call({
        to: executionManager.address,
        data,
        gasLimit: 6_700_000,
      })

      log.debug(`Result: [${result}]`)

      result.length.should.be.greaterThan(2, 'Should not just be 0x')
    })
  })

  /*
   * Test CREATE2 opcode
   */
  describe('ovmCREATE2', async () => {
    it('does not throw when passed salt and bytecode', async () => {
      const methodId: string = ethereumjsAbi
        .methodID('ovmCREATE2', [])
        .toString('hex')

      const data = `0x${methodId}${'00'.repeat(32)}${remove0x(deployTx.data)}`

      // Now actually apply it to our execution manager
      const result = await executionManager.provider.call({
        to: executionManager.address,
        data,
        gasLimit: 6_700_000,
      })

      log.debug(`Result: [${result}]`)

      result.length.should.be.greaterThan(2, 'Should not just be 0x')
    })
  })
})