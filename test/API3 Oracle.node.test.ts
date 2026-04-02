/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { API3Oracle } from '../nodes/API3 Oracle/API3 Oracle.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('API3Oracle Node', () => {
  let node: API3Oracle;

  beforeAll(() => {
    node = new API3Oracle();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('API3 Oracle');
      expect(node.description.name).toBe('api3oracle');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('DataFeeds Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-api-key', 
        baseUrl: 'https://api.api3.org/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should get all data feeds successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAllDataFeeds')
      .mockReturnValueOnce('ethereum')
      .mockReturnValueOnce('crypto');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ feeds: [] });

    const result = await executeDataFeedsOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.api3.org/v1/dapis?network=ethereum&category=crypto',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json'
      },
      json: true
    });
  });

  it('should get specific data feed successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getDataFeed')
      .mockReturnValueOnce('ETH/USD')
      .mockReturnValueOnce('ethereum');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ name: 'ETH/USD', value: '2000' });

    const result = await executeDataFeedsOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.api3.org/v1/dapis/ETH%2FUSD?network=ethereum',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json'
      },
      json: true
    });
  });

  it('should handle errors when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllDataFeeds');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeDataFeedsOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });

  it('should subscribe to data feed successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('subscribeToDataFeed')
      .mockReturnValueOnce('ETH/USD')
      .mockReturnValueOnce('https://webhook.example.com');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ subscriptionId: '123' });

    const result = await executeDataFeedsOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.api3.org/v1/dapis/ETH%2FUSD/subscribe',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json'
      },
      body: {
        webhook_url: 'https://webhook.example.com'
      },
      json: true
    });
  });
});

describe('Airnodes Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.api3.org/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn()
			},
		};
	});

	it('should get all airnodes successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAllAirnodes')
			.mockReturnValueOnce('')
			.mockReturnValueOnce('');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			airnodes: [{ id: 'airnode1', status: 'active' }]
		});

		const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.api3.org/v1/airnodes',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json'
			},
			json: true
		});
	});

	it('should get specific airnode successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAirnode')
			.mockReturnValueOnce('airnode123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'airnode123',
			status: 'active'
		});

		const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.api3.org/v1/airnodes/airnode123',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json'
			},
			json: true
		});
	});

	it('should create airnode successfully', async () => {
		const mockConfig = { name: 'test-airnode', version: '1.0.0' };
		const mockCredentials = { wallet: 'test-wallet' };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createAirnode')
			.mockReturnValueOnce(mockConfig)
			.mockReturnValueOnce(mockCredentials);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'new-airnode',
			status: 'created'
		});

		const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://api.api3.org/v1/airnodes',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json'
			},
			body: {
				config: mockConfig,
				credentials: mockCredentials
			},
			json: true
		});
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllAirnodes');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('API Error');
	});

	it('should throw error when continueOnFail is false', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllAirnodes');
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		await expect(executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]))
			.rejects.toThrow('API Error');
	});

	it('should throw error for unknown operation', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknownOperation');

		await expect(executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]))
			.rejects.toThrow('Unknown operation: unknownOperation');
	});
});

describe('OevAuctions Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.api3.org/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn()
			},
		};
	});

	describe('getAllAuctions operation', () => {
		it('should get all auctions successfully', async () => {
			const mockResponse = { auctions: [{ id: '1', status: 'active' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAllAuctions')
				.mockReturnValueOnce('all')
				.mockReturnValueOnce('');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/oev/auctions',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle errors in getAllAuctions', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAllAuctions')
				.mockReturnValueOnce('active')
				.mockReturnValueOnce('ethereum');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getAuction operation', () => {
		it('should get specific auction successfully', async () => {
			const mockResponse = { id: 'auction123', status: 'active' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAuction')
				.mockReturnValueOnce('auction123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/oev/auctions/auction123',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});
	});

	describe('createAuction operation', () => {
		it('should create auction successfully', async () => {
			const mockResponse = { id: 'new-auction', status: 'created' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createAuction')
				.mockReturnValueOnce('ETH-USD')
				.mockReturnValueOnce('{"minBid": "1000"}');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.api3.org/v1/oev/auctions',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					dataFeed: 'ETH-USD',
					parameters: { minBid: '1000' },
				},
				json: true,
			});
		});
	});

	describe('placeBid operation', () => {
		it('should place bid successfully', async () => {
			const mockResponse = { bidId: 'bid123', status: 'placed' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('placeBid')
				.mockReturnValueOnce('auction123')
				.mockReturnValueOnce('1000000000000000000')
				.mockReturnValueOnce('0x123signature');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.api3.org/v1/oev/auctions/auction123/bids',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					amount: '1000000000000000000',
					signature: '0x123signature',
				},
				json: true,
			});
		});
	});

	describe('getAuctionBids operation', () => {
		it('should get auction bids successfully', async () => {
			const mockResponse = { bids: [{ id: 'bid1', amount: '1000' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAuctionBids')
				.mockReturnValueOnce('auction123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/oev/auctions/auction123/bids',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});
	});
});

describe('Governance Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.api3.org/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'API3 Oracle Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	it('should get all proposals successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAllProposals')
			.mockReturnValueOnce('active')
			.mockReturnValueOnce('standard');

		const mockResponse = {
			proposals: [
				{ id: '1', title: 'Test Proposal', status: 'active' }
			]
		};

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeGovernanceOperations.call(
			mockExecuteFunctions,
			[{ json: {} }]
		);

		expect(result).toEqual([{
			json: mockResponse,
			pairedItem: { item: 0 },
		}]);
	});

	it('should handle get all proposals error', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAllProposals')
			.mockReturnValueOnce('')
			.mockReturnValueOnce('');

		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeGovernanceOperations.call(
			mockExecuteFunctions,
			[{ json: {} }]
		);

		expect(result).toEqual([{
			json: { error: 'API Error' },
			pairedItem: { item: 0 },
		}]);
	});

	it('should get proposal details successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getProposal')
			.mockReturnValueOnce('proposal-123');

		const mockResponse = {
			id: 'proposal-123',
			title: 'Test Proposal',
			description: 'Test Description'
		};

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeGovernanceOperations.call(
			mockExecuteFunctions,
			[{ json: {} }]
		);

		expect(result).toEqual([{
			json: mockResponse,
			pairedItem: { item: 0 },
		}]);
	});

	it('should create proposal successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createProposal')
			.mockReturnValueOnce('New Proposal')
			.mockReturnValueOnce('Proposal description')
			.mockReturnValueOnce('[{"target":"0x123","calldata":"0x456"}]');

		const mockResponse = { id: 'new-proposal-id', status: 'pending' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeGovernanceOperations.call(
			mockExecuteFunctions,
			[{ json: {} }]
		);

		expect(result).toEqual([{
			json: mockResponse,
			pairedItem: { item: 0 },
		}]);
	});

	it('should vote on proposal successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('voteOnProposal')
			.mockReturnValueOnce('proposal-123')
			.mockReturnValueOnce('for')
			.mockReturnValueOnce('0x456def...');

		const mockResponse = { success: true, transactionHash: '0x789abc...' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeGovernanceOperations.call(
			mockExecuteFunctions,
			[{ json: {} }]
		);

		expect(result).toEqual([{
			json: mockResponse,
			pairedItem: { item: 0 },
		}]);
	});

	it('should get treasury info successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTreasuryInfo');

		const mockResponse = {
			totalValue: '1000000',
			assets: [{ token: 'API3', amount: '500000' }]
		};

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeGovernanceOperations.call(
			mockExecuteFunctions,
			[{ json: {} }]
		);

		expect(result).toEqual([{
			json: mockResponse,
			pairedItem: { item: 0 },
		}]);
	});

	it('should get delegates successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getDelegates');

		const mockResponse = {
			delegates: [
				{ address: '0x123...', votingPower: '100000' }
			]
		};

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeGovernanceOperations.call(
			mockExecuteFunctions,
			[{ json: {} }]
		);

		expect(result).toEqual([{
			json: mockResponse,
			pairedItem: { item: 0 },
		}]);
	});
});

describe('Staking Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.api3.org/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'API3 Oracle Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getAllStakingPools', () => {
		it('should get all staking pools successfully', async () => {
			const mockResponse = { pools: [{ id: 'pool1', status: 'active' }] };
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllStakingPools').mockReturnValueOnce('active');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/staking/pools?status=active',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle getAllStakingPools error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllStakingPools').mockReturnValueOnce('active');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getStakingPool', () => {
		it('should get staking pool successfully', async () => {
			const mockResponse = { id: 'pool1', totalStaked: '1000000' };
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getStakingPool').mockReturnValueOnce('pool1');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/staking/pools/pool1',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('stakeTokens', () => {
		it('should stake tokens successfully', async () => {
			const mockResponse = { transactionHash: '0x123', success: true };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('stakeTokens')
				.mockReturnValueOnce('pool1')
				.mockReturnValueOnce('1000000000000000000')
				.mockReturnValueOnce('0xsignature123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.api3.org/v1/staking/pools/pool1/stake',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				body: {
					amount: '1000000000000000000',
					signature: '0xsignature123',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('unstakeTokens', () => {
		it('should unstake tokens successfully', async () => {
			const mockResponse = { transactionHash: '0x456', success: true };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('unstakeTokens')
				.mockReturnValueOnce('pool1')
				.mockReturnValueOnce('500000000000000000')
				.mockReturnValueOnce('0xsignature456');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.api3.org/v1/staking/pools/pool1/unstake',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				body: {
					amount: '500000000000000000',
					signature: '0xsignature456',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getStakingRewards', () => {
		it('should get staking rewards successfully', async () => {
			const mockResponse = { totalRewards: '100000000000000000', claimableRewards: '50000000000000000' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getStakingRewards')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890')
				.mockReturnValueOnce('30d');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/staking/rewards/0x1234567890123456789012345678901234567890?period=30d',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('claimRewards', () => {
		it('should claim rewards successfully', async () => {
			const mockResponse = { transactionHash: '0x789', claimedAmount: '50000000000000000' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('claimRewards')
				.mockReturnValueOnce('0x1234567890123456789012345678901234567890')
				.mockReturnValueOnce('0xsignature789');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.api3.org/v1/staking/rewards/0x1234567890123456789012345678901234567890/claim',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				body: {
					signature: '0xsignature789',
				},
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});
});

describe('ApiProviders Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.api3.org/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'API3 Oracle Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getAllProviders operation', () => {
		it('should get all providers successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAllProviders')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('');

			const mockResponse = { providers: [{ id: '1', name: 'Test Provider' }] };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeApiProvidersOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/providers',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle getAllProviders error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllProviders');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			await expect(executeApiProvidersOperations.call(mockExecuteFunctions, [{ json: {} }]))
				.rejects.toThrow('API Error');
		});
	});

	describe('getProvider operation', () => {
		it('should get provider successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getProvider')
				.mockReturnValueOnce('provider123');

			const mockResponse = { id: 'provider123', name: 'Test Provider' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeApiProvidersOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.api3.org/v1/providers/provider123',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});
	});

	describe('registerProvider operation', () => {
		it('should register provider successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('registerProvider')
				.mockReturnValueOnce('New Provider')
				.mockReturnValueOnce({ endpoint: [{ name: 'test', url: 'https://test.com', method: 'GET' }] })
				.mockReturnValueOnce('{"apiKey": "test-key"}');

			const mockResponse = { id: 'new-provider-id', name: 'New Provider' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeApiProvidersOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('updateProvider operation', () => {
		it('should update provider successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateProvider')
				.mockReturnValueOnce('provider123')
				.mockReturnValueOnce('{"status": "active"}');

			const mockResponse = { id: 'provider123', status: 'active' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeApiProvidersOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getProviderEndpoints operation', () => {
		it('should get provider endpoints successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getProviderEndpoints')
				.mockReturnValueOnce('provider123');

			const mockResponse = { endpoints: [{ name: 'test', url: 'https://test.com' }] };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeApiProvidersOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});
});
});
