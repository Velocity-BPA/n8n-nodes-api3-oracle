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

    it('should define 5 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(5);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(5);
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
describe('DApis Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api3.org/api/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should get all dApis successfully', async () => {
    const mockResponse = {
      dapis: [
        { id: 'dapi1', name: 'ETH/USD', network: 'ethereum' },
        { id: 'dapi2', name: 'BTC/USD', network: 'ethereum' },
      ],
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getAllDapis';
        case 'network': return 'ethereum';
        case 'category': return '';
        case 'status': return 'active';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDApisOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api3.org/api/v1/dapis?network=ethereum&status=active',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should get specific dApi successfully', async () => {
    const mockResponse = {
      id: 'dapi1',
      name: 'ETH/USD',
      network: 'ethereum',
      status: 'active',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getDapi';
        case 'dapiId': return 'dapi1';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDApisOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api3.org/api/v1/dapis/dapi1',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should create dApi successfully', async () => {
    const mockResponse = {
      success: true,
      dapiId: 'new-dapi',
      transactionHash: '0x123...',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'createDapi';
        case 'dapiId': return 'new-dapi';
        case 'network': return 'ethereum';
        case 'sponsorWallet': return '0xabc123...';
        case 'updateParameters': return '{"threshold": 0.1, "interval": 3600}';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDApisOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api3.org/api/v1/dapis',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        dapiId: 'new-dapi',
        network: 'ethereum',
        sponsorWallet: '0xabc123...',
        updateParameters: { threshold: 0.1, interval: 3600 },
      },
      json: true,
    });
  });

  it('should get dApi data successfully', async () => {
    const mockResponse = {
      dapiId: 'dapi1',
      value: '1850.50',
      timestamp: 1234567890,
      signature: '0x456...',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getDapiData';
        case 'dapiId': return 'dapi1';
        case 'timestamp': return 0;
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDApisOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api3.org/api/v1/dapis/dapi1/data',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should handle API errors', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getDapi';
        case 'dapiId': return 'invalid-dapi';
        default: return undefined;
      }
    });

    const apiError = new Error('DApi not found');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

    await expect(executeDApisOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('DApi not found');
  });

  it('should handle invalid JSON in updateParameters', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'createDapi';
        case 'dapiId': return 'new-dapi';
        case 'network': return 'ethereum';
        case 'sponsorWallet': return '0xabc123...';
        case 'updateParameters': return 'invalid-json';
        default: return undefined;
      }
    });

    await expect(executeDApisOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Invalid JSON in updateParameters');
  });
});

describe('Airnodes Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api3.org/api/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getAllAirnodes', () => {
    it('should fetch all airnodes successfully', async () => {
      const mockResponse = { airnodes: [{ id: 'airnode1', status: 'active' }] };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getAllAirnodes';
          case 'network': return 'ethereum';
          case 'provider': return 'test-provider';
          case 'status': return 'active';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api3.org/api/v1/airnodes?network=ethereum&provider=test-provider&status=active',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });

    it('should handle errors gracefully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getAllAirnodes';
        return '';
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getAirnode', () => {
    it('should fetch airnode details successfully', async () => {
      const mockResponse = { id: 'airnode1', name: 'Test Airnode' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getAirnode';
          case 'airnodeId': return 'airnode1';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('createRequest', () => {
    it('should create a request successfully', async () => {
      const mockResponse = { requestId: 'req123', status: 'pending' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'createRequest';
          case 'airnodeId': return 'airnode1';
          case 'endpointId': return 'endpoint1';
          case 'parameters': return '{"key": "value"}';
          case 'sponsorWallet': return '0x123...';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('deployAirnode', () => {
    it('should deploy airnode successfully', async () => {
      const mockResponse = { airnodeId: 'airnode123', status: 'deploying' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'deployAirnode';
          case 'config': return '{"name": "test"}';
          case 'secrets': return '{"secret": "value"}';
          case 'networkDeploy': return 'ethereum';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('removeAirnode', () => {
    it('should remove airnode successfully', async () => {
      const mockResponse = { success: true, message: 'Airnode deactivated' };
      
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'removeAirnode';
          case 'airnodeId': return 'airnode1';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAirnodesOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });
});

describe('OevAuctions Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api3.org/api/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getAllAuctions', () => {
    it('should get all auctions successfully', async () => {
      const mockResponse = {
        auctions: [
          { id: 'auction1', status: 'active', network: 'ethereum' },
          { id: 'auction2', status: 'completed', network: 'polygon' }
        ]
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'getAllAuctions';
          case 'network': return 'ethereum';
          case 'status': return 'active';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('getAuction', () => {
    it('should get auction details successfully', async () => {
      const mockResponse = {
        id: 'auction1',
        dapiId: 'dapi123',
        status: 'active',
        reservePrice: '1000000000000000000'
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'getAuction';
          case 'auctionId': return 'auction1';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('createAuction', () => {
    it('should create auction successfully', async () => {
      const mockResponse = {
        id: 'auction123',
        dapiId: 'dapi456',
        reservePrice: '1000000000000000000',
        duration: 3600,
        status: 'active'
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'createAuction';
          case 'dapiId': return 'dapi456';
          case 'network': return 'ethereum';
          case 'reservePrice': return '1000000000000000000';
          case 'duration': return 3600;
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('placeBid', () => {
    it('should place bid successfully', async () => {
      const mockResponse = {
        bidId: 'bid123',
        auctionId: 'auction1',
        bidAmount: '2000000000000000000',
        timestamp: '2023-01-01T00:00:00Z'
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'placeBid';
          case 'auctionId': return 'auction1';
          case 'bidAmount': return '2000000000000000000';
          case 'signature': return '0x123456789';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('getOevRewards', () => {
    it('should get OEV rewards successfully', async () => {
      const mockResponse = {
        address: '0x123456789',
        totalRewards: '5000000000000000000',
        rewards: [
          { auctionId: 'auction1', amount: '3000000000000000000' },
          { auctionId: 'auction2', amount: '2000000000000000000' }
        ]
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'getOevRewards';
          case 'address': return '0x123456789';
          case 'network': return 'ethereum';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('error handling', () => {
    it('should handle API errors correctly', async () => {
      const error = new Error('API Error');
      (error as any).httpCode = 400;

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'getAuction';
          case 'auctionId': return 'invalid-auction';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);

      await expect(executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]))
        .rejects.toThrow('API Error');
    });

    it('should continue on fail when configured', async () => {
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      const error = new Error('Test error');

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'getAuction';
          default: return '';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);

      const result = await executeOevAuctionsOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json.error).toBe('Test error');
    });
  });
});

describe('DaoGovernance Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api3.org/api/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should get all proposals successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getAllProposals';
      if (param === 'status') return 'active';
      if (param === 'category') return 'treasury';
      if (param === 'voter') return '0x123';
      return '';
    });

    const mockResponse = {
      proposals: [
        {
          id: '1',
          title: 'Test Proposal',
          status: 'active',
          category: 'treasury',
        },
      ],
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDaoGovernanceOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api3.org/api/v1/dao/proposals?status=active&category=treasury&voter=0x123',
      headers: {
        Authorization: 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should get proposal details successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getProposal';
      if (param === 'proposalId') return '123';
      return '';
    });

    const mockResponse = {
      id: '123',
      title: 'Test Proposal',
      description: 'Test Description',
      votes: [],
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDaoGovernanceOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should create proposal successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'createProposal';
      if (param === 'title') return 'New Proposal';
      if (param === 'description') return 'Proposal Description';
      if (param === 'actions') return '[{"target": "0x123", "value": "0"}]';
      if (param === 'signature') return '0xsignature';
      return '';
    });

    const mockResponse = {
      id: '456',
      title: 'New Proposal',
      status: 'pending',
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDaoGovernanceOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should cast vote successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'castVote';
      if (param === 'proposalId') return '123';
      if (param === 'support') return 'for';
      if (param === 'signature') return '0xsignature';
      if (param === 'votingPower') return '1000';
      return '';
    });

    const mockResponse = {
      voteId: '789',
      proposalId: '123',
      support: 'for',
      votingPower: '1000',
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDaoGovernanceOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should get treasury information successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getTreasury';
      return '';
    });

    const mockResponse = {
      totalValue: '1000000',
      tokens: [
        { symbol: 'API3', balance: '500000' },
        { symbol: 'ETH', balance: '100' },
      ],
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDaoGovernanceOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should handle errors correctly', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getAllProposals';
      return '';
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
      new Error('API Error'),
    );
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeDaoGovernanceOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });
});

describe('Staking Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api3.org/api/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('getAllPools should fetch all staking pools', async () => {
    const mockResponse = {
      pools: [
        { id: 'pool1', name: 'Pool 1', apr: 5.5, status: 'active' },
        { id: 'pool2', name: 'Pool 2', apr: 7.2, status: 'active' }
      ]
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getAllPools';
        case 'network': return 'ethereum';
        case 'status': return 'active';
        case 'minApr': return 5;
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api3.org/api/v1/staking/pools',
      headers: { 'Authorization': 'Bearer test-api-key' },
      qs: { network: 'ethereum', status: 'active', minApr: 5 },
      json: true,
    });
  });

  test('getPool should fetch specific pool details', async () => {
    const mockResponse = {
      id: 'pool1',
      name: 'Pool 1',
      apr: 5.5,
      totalStaked: '1000000',
      status: 'active'
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getPool';
        case 'poolId': return 'pool1';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  test('stakeTokens should stake tokens in pool', async () => {
    const mockResponse = {
      transactionHash: '0xabc123',
      poolId: 'pool1',
      amount: '1000',
      status: 'pending'
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'stakeTokens';
        case 'poolId': return 'pool1';
        case 'amount': return '1000';
        case 'signature': return '0xsignature123';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api3.org/api/v1/staking/pools/pool1/stake',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json'
      },
      body: {
        amount: '1000',
        signature: '0xsignature123'
      },
      json: true,
    });
  });

  test('getStakingPositions should fetch user staking positions', async () => {
    const mockResponse = {
      positions: [
        { poolId: 'pool1', amount: '500', rewards: '25' },
        { poolId: 'pool2', amount: '1000', rewards: '75' }
      ]
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getStakingPositions';
        case 'address': return '0xuser123';
        case 'network': return 'ethereum';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  test('should handle errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getAllPools';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });
});
});
