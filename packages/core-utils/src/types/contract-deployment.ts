import { Wallet } from 'ethers'
import { Provider } from 'ethers/providers'

/**
 * Deploys a contract and returns its deployed address.
 *
 * @param Wallet The Wallet to deploy from
 * @returns The deployed address as a hex string
 */
export type ContractDeploymentFunction = (w: Wallet) => Promise<string>
