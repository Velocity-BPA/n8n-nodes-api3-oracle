/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-api3oracle/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class API3Oracle implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'API3 Oracle',
    name: 'api3oracle',
    icon: 'file:api3oracle.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the API3 Oracle API',
    defaults: {
      name: 'API3 Oracle',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'api3oracleApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'DataFeeds',
            value: 'dataFeeds',
          },
          {
            name: 'Airnodes',
            value: 'airnodes',
          },
          {
            name: 'OevAuctions',
            value: 'oevAuctions',
          },
          {
            name: 'Governance',
            value: 'governance',
          },
          {
            name: 'Staking',
            value: 'staking',
          },
          {
            name: 'ApiProviders',
            value: 'apiProviders',
          }
        ],
        default: 'dataFeeds',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['dataFeeds'] } },
  options: [
    { name: 'Get All Data Feeds', value: 'getAllDataFeeds', description: 'Get all available dAPI feeds', action: 'Get all data feeds' },
    { name: 'Get Data Feed', value: 'getDataFeed', description: 'Get specific dAPI feed details', action: 'Get data feed' },
    { name: 'Get Data Feed Value', value: 'getDataFeedValue', description: 'Get current value of dAPI', action: 'Get data feed value' },
    { name: 'Get Data Feed History', value: 'getDataFeedHistory', description: 'Get historical data for dAPI', action: 'Get data feed history' },
    { name: 'Subscribe To Data Feed', value: 'subscribeToDataFeed', description: 'Subscribe to real-time updates', action: 'Subscribe to data feed' }
  ],
  default: 'getAllDataFeeds',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { 
		show: { 
			resource: ['airnodes'] 
		} 
	},
	options: [
		{
			name: 'Get All Airnodes',
			value: 'getAllAirnodes',
			description: 'List all available Airnodes',
			action: 'Get all airnodes'
		},
		{
			name: 'Get Airnode',
			value: 'getAirnode',
			description: 'Get specific Airnode details',
			action: 'Get airnode'
		},
		{
			name: 'Create Airnode',
			value: 'createAirnode',
			description: 'Deploy new Airnode',
			action: 'Create airnode'
		},
		{
			name: 'Update Airnode',
			value: 'updateAirnode',
			description: 'Update Airnode configuration',
			action: 'Update airnode'
		},
		{
			name: 'Delete Airnode',
			value: 'deleteAirnode',
			description: 'Remove Airnode',
			action: 'Delete airnode'
		},
		{
			name: 'Get Airnode Status',
			value: 'getAirnodeStatus',
			description: 'Get Airnode operational status',
			action: 'Get airnode status'
		}
	],
	default: 'getAllAirnodes',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
		},
	},
	options: [
		{
			name: 'Get All Auctions',
			value: 'getAllAuctions',
			description: 'List active and completed OEV auctions',
			action: 'Get all auctions',
		},
		{
			name: 'Get Auction',
			value: 'getAuction',
			description: 'Get specific auction details',
			action: 'Get auction',
		},
		{
			name: 'Create Auction',
			value: 'createAuction',
			description: 'Create new OEV auction',
			action: 'Create auction',
		},
		{
			name: 'Place Bid',
			value: 'placeBid',
			description: 'Place bid on auction',
			action: 'Place bid',
		},
		{
			name: 'Get Auction Bids',
			value: 'getAuctionBids',
			description: 'Get bids for auction',
			action: 'Get auction bids',
		},
	],
	default: 'getAllAuctions',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['governance'],
		},
	},
	options: [
		{
			name: 'Get All Proposals',
			value: 'getAllProposals',
			description: 'List governance proposals',
			action: 'Get all proposals',
		},
		{
			name: 'Get Proposal',
			value: 'getProposal',
			description: 'Get proposal details',
			action: 'Get proposal details',
		},
		{
			name: 'Create Proposal',
			value: 'createProposal',
			description: 'Submit new governance proposal',
			action: 'Create new proposal',
		},
		{
			name: 'Vote on Proposal',
			value: 'voteOnProposal',
			description: 'Cast vote on proposal',
			action: 'Vote on proposal',
		},
		{
			name: 'Get Treasury Info',
			value: 'getTreasuryInfo',
			description: 'Get DAO treasury information',
			action: 'Get treasury info',
		},
		{
			name: 'Get Delegates',
			value: 'getDelegates',
			description: 'List governance delegates',
			action: 'Get delegates',
		},
	],
	default: 'getAllProposals',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['staking'],
		},
	},
	options: [
		{
			name: 'Get All Staking Pools',
			value: 'getAllStakingPools',
			description: 'List all staking pools',
			action: 'Get all staking pools',
		},
		{
			name: 'Get Staking Pool',
			value: 'getStakingPool',
			description: 'Get staking pool details',
			action: 'Get staking pool details',
		},
		{
			name: 'Stake Tokens',
			value: 'stakeTokens',
			description: 'Stake API3 tokens in pool',
			action: 'Stake tokens in pool',
		},
		{
			name: 'Unstake Tokens',
			value: 'unstakeTokens',
			description: 'Unstake tokens from pool',
			action: 'Unstake tokens from pool',
		},
		{
			name: 'Get Staking Rewards',
			value: 'getStakingRewards',
			description: 'Get staking rewards for address',
			action: 'Get staking rewards',
		},
		{
			name: 'Claim Rewards',
			value: 'claimRewards',
			description: 'Claim staking rewards',
			action: 'Claim staking rewards',
		},
	],
	default: 'getAllStakingPools',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['apiProviders'],
		},
	},
	options: [
		{
			name: 'Get All Providers',
			value: 'getAllProviders',
			description: 'List all API providers',
			action: 'Get all providers',
		},
		{
			name: 'Get Provider',
			value: 'getProvider',
			description: 'Get provider details',
			action: 'Get a provider',
		},
		{
			name: 'Register Provider',
			value: 'registerProvider',
			description: 'Register new API provider',
			action: 'Register a provider',
		},
		{
			name: 'Update Provider',
			value: 'updateProvider',
			description: 'Update provider configuration',
			action: 'Update a provider',
		},
		{
			name: 'Get Provider Endpoints',
			value: 'getProviderEndpoints',
			description: 'Get provider API endpoints',
			action: 'Get provider endpoints',
		},
	],
	default: 'getAllProviders',
},
{
  displayName: 'Network',
  name: 'network',
  type: 'string',
  default: '',
  description: 'The blockchain network to query',
  displayOptions: {
    show: {
      resource: ['dataFeeds'],
      operation: ['getAllDataFeeds', 'getDataFeed', 'getDataFeedValue']
    }
  }
},
{
  displayName: 'Category',
  name: 'category',
  type: 'string',
  default: '',
  description: 'Filter feeds by category',
  displayOptions: {
    show: {
      resource: ['dataFeeds'],
      operation: ['getAllDataFeeds']
    }
  }
},
{
  displayName: 'dAPI Name',
  name: 'dapiName',
  type: 'string',
  required: true,
  default: '',
  description: 'Name of the dAPI to query',
  displayOptions: {
    show: {
      resource: ['dataFeeds'],
      operation: ['getDataFeed', 'getDataFeedValue', 'getDataFeedHistory', 'subscribeToDataFeed']
    }
  }
},
{
  displayName: 'From',
  name: 'from',
  type: 'dateTime',
  default: '',
  description: 'Start date for historical data',
  displayOptions: {
    show: {
      resource: ['dataFeeds'],
      operation: ['getDataFeedHistory']
    }
  }
},
{
  displayName: 'To',
  name: 'to',
  type: 'dateTime',
  default: '',
  description: 'End date for historical data',
  displayOptions: {
    show: {
      resource: ['dataFeeds'],
      operation: ['getDataFeedHistory']
    }
  }
},
{
  displayName: 'Interval',
  name: 'interval',
  type: 'options',
  options: [
    { name: '1 Minute', value: '1m' },
    { name: '5 Minutes', value: '5m' },
    { name: '15 Minutes', value: '15m' },
    { name: '1 Hour', value: '1h' },
    { name: '1 Day', value: '1d' }
  ],
  default: '1h',
  description: 'Time interval for historical data',
  displayOptions: {
    show: {
      resource: ['dataFeeds'],
      operation: ['getDataFeedHistory']
    }
  }
},
{
  displayName: 'Webhook URL',
  name: 'webhookUrl',
  type: 'string',
  required: true,
  default: '',
  description: 'URL to receive real-time updates',
  displayOptions: {
    show: {
      resource: ['dataFeeds'],
      operation: ['subscribeToDataFeed']
    }
  }
},
{
	displayName: 'Status',
	name: 'status',
	type: 'string',
	default: '',
	description: 'Filter airnodes by status',
	displayOptions: {
		show: {
			resource: ['airnodes'],
			operation: ['getAllAirnodes']
		}
	}
},
{
	displayName: 'Provider',
	name: 'provider',
	type: 'string',
	default: '',
	description: 'Filter airnodes by provider',
	displayOptions: {
		show: {
			resource: ['airnodes'],
			operation: ['getAllAirnodes']
		}
	}
},
{
	displayName: 'Airnode ID',
	name: 'airnodeId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the Airnode',
	displayOptions: {
		show: {
			resource: ['airnodes'],
			operation: ['getAirnode', 'updateAirnode', 'deleteAirnode', 'getAirnodeStatus']
		}
	}
},
{
	displayName: 'Config',
	name: 'config',
	type: 'json',
	required: true,
	default: '{}',
	description: 'Airnode configuration object',
	displayOptions: {
		show: {
			resource: ['airnodes'],
			operation: ['createAirnode', 'updateAirnode']
		}
	}
},
{
	displayName: 'Credentials',
	name: 'credentials',
	type: 'json',
	required: true,
	default: '{}',
	description: 'Airnode credentials object',
	displayOptions: {
		show: {
			resource: ['airnodes'],
			operation: ['createAirnode']
		}
	}
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	options: [
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Completed',
			value: 'completed',
		},
		{
			name: 'All',
			value: 'all',
		},
	],
	default: 'all',
	description: 'Filter auctions by status',
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
			operation: ['getAllAuctions'],
		},
	},
},
{
	displayName: 'Network',
	name: 'network',
	type: 'string',
	default: '',
	description: 'Filter auctions by blockchain network',
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
			operation: ['getAllAuctions'],
		},
	},
},
{
	displayName: 'Auction ID',
	name: 'auctionId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the auction',
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
			operation: ['getAuction', 'placeBid', 'getAuctionBids'],
		},
	},
},
{
	displayName: 'Data Feed',
	name: 'dataFeed',
	type: 'string',
	required: true,
	default: '',
	description: 'The data feed identifier for the auction',
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
			operation: ['createAuction'],
		},
	},
},
{
	displayName: 'Parameters',
	name: 'parameters',
	type: 'json',
	default: '{}',
	description: 'Additional parameters for the auction',
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
			operation: ['createAuction'],
		},
	},
},
{
	displayName: 'Bid Amount',
	name: 'amount',
	type: 'string',
	required: true,
	default: '',
	description: 'The bid amount in wei',
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
			operation: ['placeBid'],
		},
	},
},
{
	displayName: 'Signature',
	name: 'signature',
	type: 'string',
	required: true,
	default: '',
	description: 'The cryptographic signature for the bid',
	displayOptions: {
		show: {
			resource: ['oevAuctions'],
			operation: ['placeBid'],
		},
	},
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getAllProposals'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Pending',
			value: 'pending',
		},
		{
			name: 'Executed',
			value: 'executed',
		},
		{
			name: 'Defeated',
			value: 'defeated',
		},
	],
	default: '',
	description: 'Filter proposals by status',
},
{
	displayName: 'Type',
	name: 'type',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getAllProposals'],
		},
	},
	default: '',
	description: 'Filter proposals by type',
},
{
	displayName: 'Proposal ID',
	name: 'proposalId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['getProposal', 'voteOnProposal'],
		},
	},
	default: '',
	description: 'The unique identifier of the proposal',
},
{
	displayName: 'Title',
	name: 'title',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['createProposal'],
		},
	},
	default: '',
	description: 'The title of the proposal',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	typeOptions: {
		rows: 4,
	},
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['createProposal'],
		},
	},
	default: '',
	description: 'The detailed description of the proposal',
},
{
	displayName: 'Actions',
	name: 'actions',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['createProposal'],
		},
	},
	default: '[]',
	description: 'Array of actions to be executed if proposal passes',
},
{
	displayName: 'Vote',
	name: 'vote',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['voteOnProposal'],
		},
	},
	options: [
		{
			name: 'For',
			value: 'for',
		},
		{
			name: 'Against',
			value: 'against',
		},
		{
			name: 'Abstain',
			value: 'abstain',
		},
	],
	default: 'for',
	description: 'The vote to cast on the proposal',
},
{
	displayName: 'Signature',
	name: 'signature',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['governance'],
			operation: ['voteOnProposal'],
		},
	},
	default: '',
	description: 'Ethereum wallet signature for the vote',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['staking'],
			operation: ['getAllStakingPools'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Inactive',
			value: 'inactive',
		},
		{
			name: 'Pending',
			value: 'pending',
		},
	],
	default: '',
	description: 'Filter pools by status',
},
{
	displayName: 'Pool ID',
	name: 'poolId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['staking'],
			operation: ['getStakingPool', 'stakeTokens', 'unstakeTokens'],
		},
	},
	default: '',
	description: 'The ID of the staking pool',
},
{
	displayName: 'Amount',
	name: 'amount',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['staking'],
			operation: ['stakeTokens', 'unstakeTokens'],
		},
	},
	default: '',
	description: 'Amount of tokens to stake/unstake (in wei)',
},
{
	displayName: 'Signature',
	name: 'signature',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['staking'],
			operation: ['stakeTokens', 'unstakeTokens', 'claimRewards'],
		},
	},
	default: '',
	description: 'Ethereum wallet signature for the transaction',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['staking'],
			operation: ['getStakingRewards', 'claimRewards'],
		},
	},
	default: '',
	description: 'Ethereum address to check rewards for',
},
{
	displayName: 'Period',
	name: 'period',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['staking'],
			operation: ['getStakingRewards'],
		},
	},
	options: [
		{
			name: 'All Time',
			value: 'all',
		},
		{
			name: 'Last 7 Days',
			value: '7d',
		},
		{
			name: 'Last 30 Days',
			value: '30d',
		},
		{
			name: 'Last 90 Days',
			value: '90d',
		},
	],
	default: 'all',
	description: 'Time period for rewards calculation',
},
{
	displayName: 'Category',
	name: 'category',
	type: 'string',
	default: '',
	description: 'Filter providers by category',
	displayOptions: {
		show: {
			resource: ['apiProviders'],
			operation: ['getAllProviders'],
		},
	},
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	options: [
		{ name: 'Active', value: 'active' },
		{ name: 'Inactive', value: 'inactive' },
		{ name: 'Pending', value: 'pending' },
	],
	default: '',
	description: 'Filter providers by status',
	displayOptions: {
		show: {
			resource: ['apiProviders'],
			operation: ['getAllProviders'],
		},
	},
},
{
	displayName: 'Provider ID',
	name: 'providerId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the provider',
	displayOptions: {
		show: {
			resource: ['apiProviders'],
			operation: ['getProvider', 'updateProvider', 'getProviderEndpoints'],
		},
	},
},
{
	displayName: 'Provider Name',
	name: 'name',
	type: 'string',
	required: true,
	default: '',
	description: 'Name of the API provider',
	displayOptions: {
		show: {
			resource: ['apiProviders'],
			operation: ['registerProvider'],
		},
	},
},
{
	displayName: 'Endpoints',
	name: 'endpoints',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: { endpoint: [{ name: '', url: '', method: 'GET' }] },
	options: [
		{
			name: 'endpoint',
			displayName: 'Endpoint',
			values: [
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: '',
					description: 'Endpoint name',
				},
				{
					displayName: 'URL',
					name: 'url',
					type: 'string',
					default: '',
					description: 'Endpoint URL',
				},
				{
					displayName: 'Method',
					name: 'method',
					type: 'options',
					options: [
						{ name: 'GET', value: 'GET' },
						{ name: 'POST', value: 'POST' },
						{ name: 'PUT', value: 'PUT' },
						{ name: 'DELETE', value: 'DELETE' },
					],
					default: 'GET',
					description: 'HTTP method',
				},
			],
		},
	],
	description: 'API endpoints provided',
	displayOptions: {
		show: {
			resource: ['apiProviders'],
			operation: ['registerProvider'],
		},
	},
},
{
	displayName: 'Credentials',
	name: 'credentials',
	type: 'json',
	default: '{}',
	description: 'Provider credentials configuration',
	displayOptions: {
		show: {
			resource: ['apiProviders'],
			operation: ['registerProvider'],
		},
	},
},
{
	displayName: 'Configuration',
	name: 'config',
	type: 'json',
	required: true,
	default: '{}',
	description: 'Provider configuration to update',
	displayOptions: {
		show: {
			resource: ['apiProviders'],
			operation: ['updateProvider'],
		},
	},
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'dataFeeds':
        return [await executeDataFeedsOperations.call(this, items)];
      case 'airnodes':
        return [await executeAirnodesOperations.call(this, items)];
      case 'oevAuctions':
        return [await executeOevAuctionsOperations.call(this, items)];
      case 'governance':
        return [await executeGovernanceOperations.call(this, items)];
      case 'staking':
        return [await executeStakingOperations.call(this, items)];
      case 'apiProviders':
        return [await executeApiProvidersOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeDataFeedsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('api3oracleApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAllDataFeeds': {
          const network = this.getNodeParameter('network', i) as string;
          const category = this.getNodeParameter('category', i) as string;
          
          const queryParams = new URLSearchParams();
          if (network) queryParams.append('network', network);
          if (category) queryParams.append('category', category);
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dapis${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getDataFeed': {
          const dapiName = this.getNodeParameter('dapiName', i) as string;
          const network = this.getNodeParameter('network', i) as string;
          
          const queryParams = new URLSearchParams();
          if (network) queryParams.append('network', network);
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dapis/${encodeURIComponent(dapiName)}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getDataFeedValue': {
          const dapiName = this.getNodeParameter('dapiName', i) as string;
          const network = this.getNodeParameter('network', i) as string;
          
          const queryParams = new URLSearchParams();
          if (network) queryParams.append('network', network);
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dapis/${encodeURIComponent(dapiName)}/value${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getDataFeedHistory': {
          const dapiName = this.getNodeParameter('dapiName', i) as string;
          const from = this.getNodeParameter('from', i) as string;
          const to = this.getNodeParameter('to', i) as string;
          const interval = this.getNodeParameter('interval', i) as string;
          
          const queryParams = new URLSearchParams();
          if (from) queryParams.append('from', from);
          if (to) queryParams.append('to', to);
          if (interval) queryParams.append('interval', interval);
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dapis/${encodeURIComponent(dapiName)}/history${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'subscribeToDataFeed': {
          const dapiName = this.getNodeParameter('dapiName', i) as string;
          const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/dapis/${encodeURIComponent(dapiName)}/subscribe`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            body: {
              webhook_url: webhookUrl
            },
            json: true
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i }
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeAirnodesOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('api3oracleApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllAirnodes': {
					const status = this.getNodeParameter('status', i) as string;
					const provider = this.getNodeParameter('provider', i) as string;
					
					const queryParams: any = {};
					if (status) queryParams.status = status;
					if (provider) queryParams.provider = provider;
					
					const queryString = Object.keys(queryParams).length > 0 
						? '?' + new URLSearchParams(queryParams).toString() 
						: '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/airnodes${queryString}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json'
						},
						json: true
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAirnode': {
					const airnodeId = this.getNodeParameter('airnodeId', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/airnodes/${airnodeId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json'
						},
						json: true
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createAirnode': {
					const config = this.getNodeParameter('config', i) as object;
					const credentialsParam = this.getNodeParameter('credentials', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/airnodes`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json'
						},
						body: {
							config,
							credentials: credentialsParam
						},
						json: true
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateAirnode': {
					const airnodeId = this.getNodeParameter('airnodeId', i) as string;
					const config = this.getNodeParameter('config', i) as object;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/airnodes/${airnodeId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json'
						},
						body: {
							config
						},
						json: true
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteAirnode': {
					const airnodeId = this.getNodeParameter('airnodeId', i) as string;
					
					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/airnodes/${airnodeId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json'
						},
						json: true
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAirnodeStatus': {
					const airnodeId = this.getNodeParameter('airnodeId', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/airnodes/${airnodeId}/status`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json'
						},
						json: true
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i }
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i }
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeOevAuctionsOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('api3oracleApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllAuctions': {
					const status = this.getNodeParameter('status', i) as string;
					const network = this.getNodeParameter('network', i) as string;

					const queryParams: string[] = [];
					if (status && status !== 'all') {
						queryParams.push(`status=${encodeURIComponent(status)}`);
					}
					if (network) {
						queryParams.push(`network=${encodeURIComponent(network)}`);
					}

					const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
					const url = `${credentials.baseUrl}/oev/auctions${queryString}`;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAuction': {
					const auctionId = this.getNodeParameter('auctionId', i) as string;
					const url = `${credentials.baseUrl}/oev/auctions/${auctionId}`;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createAuction': {
					const dataFeed = this.getNodeParameter('dataFeed', i) as string;
					const parameters = this.getNodeParameter('parameters', i) as string;

					let parsedParameters: any = {};
					if (parameters) {
						try {
							parsedParameters = JSON.parse(parameters);
						} catch (error: any) {
							throw new NodeOperationError(this.getNode(), `Invalid JSON in parameters: ${error.message}`);
						}
					}

					const body = {
						dataFeed,
						parameters: parsedParameters,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/oev/auctions`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'placeBid': {
					const auctionId = this.getNodeParameter('auctionId', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					const signature = this.getNodeParameter('signature', i) as string;

					const body = {
						amount,
						signature,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/oev/auctions/${auctionId}/bids`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAuctionBids': {
					const auctionId = this.getNodeParameter('auctionId', i) as string;
					const url = `${credentials.baseUrl}/oev/auctions/${auctionId}/bids`;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeGovernanceOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('api3oracleApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllProposals': {
					const status = this.getNodeParameter('status', i) as string;
					const type = this.getNodeParameter('type', i) as string;

					const queryParams: string[] = [];
					if (status) queryParams.push(`status=${encodeURIComponent(status)}`);
					if (type) queryParams.push(`type=${encodeURIComponent(type)}`);

					const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/proposals${queryString}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getProposal': {
					const proposalId = this.getNodeParameter('proposalId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/proposals/${proposalId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createProposal': {
					const title = this.getNodeParameter('title', i) as string;
					const description = this.getNodeParameter('description', i) as string;
					const actions = this.getNodeParameter('actions', i) as any;

					const body: any = {
						title,
						description,
						actions: typeof actions === 'string' ? JSON.parse(actions) : actions,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/governance/proposals`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'voteOnProposal': {
					const proposalId = this.getNodeParameter('proposalId', i) as string;
					const vote = this.getNodeParameter('vote', i) as string;
					const signature = this.getNodeParameter('signature', i) as string;

					const body: any = {
						vote,
						signature,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/governance/proposals/${proposalId}/vote`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTreasuryInfo': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/treasury`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getDelegates': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/delegates`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeStakingOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('api3oracleApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllStakingPools': {
					const status = this.getNodeParameter('status', i) as string;
					const queryParams = status ? `?status=${status}` : '';
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/staking/pools${queryParams}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getStakingPool': {
					const poolId = this.getNodeParameter('poolId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/staking/pools/${poolId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'stakeTokens': {
					const poolId = this.getNodeParameter('poolId', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					const signature = this.getNodeParameter('signature', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/staking/pools/${poolId}/stake`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							amount,
							signature,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'unstakeTokens': {
					const poolId = this.getNodeParameter('poolId', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					const signature = this.getNodeParameter('signature', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/staking/pools/${poolId}/unstake`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							amount,
							signature,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getStakingRewards': {
					const address = this.getNodeParameter('address', i) as string;
					const period = this.getNodeParameter('period', i) as string;
					const queryParams = period && period !== 'all' ? `?period=${period}` : '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/staking/rewards/${address}${queryParams}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'claimRewards': {
					const address = this.getNodeParameter('address', i) as string;
					const signature = this.getNodeParameter('signature', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/staking/rewards/${address}/claim`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							signature,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeApiProvidersOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('api3oracleApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllProviders': {
					const category = this.getNodeParameter('category', i) as string;
					const status = this.getNodeParameter('status', i) as string;

					const queryParams: any = {};
					if (category) queryParams.category = category;
					if (status) queryParams.status = status;

					const queryString = Object.keys(queryParams).length > 0 
						? '?' + new URLSearchParams(queryParams).toString()
						: '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/providers${queryString}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getProvider': {
					const providerId = this.getNodeParameter('providerId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/providers/${providerId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'registerProvider': {
					const name = this.getNodeParameter('name', i) as string;
					const endpoints = this.getNodeParameter('endpoints', i) as any;
					const providerCredentials = this.getNodeParameter('credentials', i) as string;

					let parsedCredentials: any = {};
					try {
						parsedCredentials = JSON.parse(providerCredentials);
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), 'Invalid JSON in credentials field');
					}

					const body: any = {
						name,
						endpoints: endpoints.endpoint || [],
						credentials: parsedCredentials,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/providers`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateProvider': {
					const providerId = this.getNodeParameter('providerId', i) as string;
					const config = this.getNodeParameter('config', i) as string;

					let parsedConfig: any = {};
					try {
						parsedConfig = JSON.parse(config);
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), 'Invalid JSON in config field');
					}

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/providers/${providerId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: parsedConfig,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getProviderEndpoints': {
					const providerId = this.getNodeParameter('providerId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/providers/${providerId}/endpoints`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
