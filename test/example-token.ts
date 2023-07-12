import { expect } from 'chai'
import { ethers } from 'hardhat'
import type { SnapshotRestorer } from '@nomicfoundation/hardhat-network-helpers'
import { takeSnapshot } from '@nomicfoundation/hardhat-network-helpers'
import type { ExampleToken } from '../typechain-types'

describe('Example', () => {
	let example: ExampleToken
	let snapshot: SnapshotRestorer
	before(async () => {
		const factory = await ethers.getContractFactory('ExampleToken')
		example = (await factory.deploy()) as ExampleToken
		await example.deployed()
		await example.initialize()
	})
	beforeEach(async () => {
		snapshot = await takeSnapshot()
	})
	afterEach(async () => {
		await snapshot.restore()
	})
	describe('name', () => {
		it('check name', async () => {
			const value = await example.name()
			expect(value.toString()).to.equal('token')
		})
	})
	describe('symbol', () => {
		it('check symbol', async () => {
			const symbol = await example.symbol()
			expect(symbol.toString()).to.equal('TOKEN')
		})
	})
})
