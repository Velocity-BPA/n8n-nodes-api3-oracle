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
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'DApis',
            value: 'dApis',
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
            name: 'DaoGovernance',
            value: 'daoGovernance',
          },
          {
            name: 'Staking',
            value: 'staking',
          }
        ],
        default: 'dApis',
      },
      // Operation dropdowns per resource
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
    },
  },
  options: [
    {
      name: 'Get All DApis',
      value: 'getAllDapis',
      description: 'Retrieve all available dAPIs',
      action: 'Get all DApis',
    },
    {
      name: 'Get DApi',
      value: 'getDapi',
      description: 'Get specific dAPI details',
      action: 'Get DApi',
    },
    {
      name: 'Create DApi',
      value: 'createDapi',
      description: 'Create new dAPI subscription',
      action: 'Create DApi',
    },
    {
      name: 'Update DApi',
      value: 'updateDapi',
      description: 'Update dAPI configuration',
      action: 'Update DApi',
    },
    {
      name: 'Delete DApi',
      value: 'deleteDapi',
      description: 'Remove dAPI subscription',
      action: 'Delete DApi',
    },
    {
      name: 'Get DApi Data',
      value: 'getDapiData',
      description: 'Get latest data from dAPI',
      action: 'Get DApi data',
    },
    {
      name: 'Get DApi History',
      value: 'getDapiHistory',
      description: 'Get historical data',
      action: 'Get DApi history',
    },
  ],
  default: 'getAllDapis',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
    },
  },
  options: [
    {
      name: 'Get All Airnodes',
      value: 'getAllAirnodes',
      description: 'List all available Airnodes',
      action: 'Get all airnodes',
    },
    {
      name: 'Get Airnode',
      value: 'getAirnode',
      description: 'Get Airnode details and endpoints',
      action: 'Get airnode details',
    },
    {
      name: 'Create Request',
      value: 'createRequest',
      description: 'Make request to Airnode',
      action: 'Create airnode request',
    },
    {
      name: 'Get Request',
      value: 'getRequest',
      description: 'Check request status',
      action: 'Get request status',
    },
    {
      name: 'Get Endpoints',
      value: 'getEndpoints',
      description: 'List Airnode endpoints',
      action: 'Get airnode endpoints',
    },
    {
      name: 'Deploy Airnode',
      value: 'deployAirnode',
      description: 'Deploy new Airnode',
      action: 'Deploy new airnode',
    },
    {
      name: 'Update Airnode',
      value: 'updateAirnode',
      description: 'Update Airnode configuration',
      action: 'Update airnode configuration',
    },
    {
      name: 'Remove Airnode',
      value: 'removeAirnode',
      description: 'Deactivate Airnode',
      action: 'Remove airnode',
    },
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
      description: 'List active and past OEV auctions',
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
      description: 'Place bid on OEV auction',
      action: 'Place bid',
    },
    {
      name: 'Get Auction Bids',
      value: 'getAuctionBids',
      description: 'Get all bids for auction',
      action: 'Get auction bids',
    },
    {
      name: 'Update Auction',
      value: 'updateAuction',
      description: 'Update auction parameters',
      action: 'Update auction',
    },
    {
      name: 'Cancel Auction',
      value: 'cancelAuction',
      description: 'Cancel active auction',
      action: 'Cancel auction',
    },
    {
      name: 'Get OEV Rewards',
      value: 'getOevRewards',
      description: 'Get OEV rewards earned',
      action: 'Get OEV rewards',
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
      resource: ['daoGovernance'],
    },
  },
  options: [
    {
      name: 'Get All Proposals',
      value: 'getAllProposals',
      description: 'List all governance proposals',
      action: 'Get all proposals',
    },
    {
      name: 'Get Proposal',
      value: 'getProposal',
      description: 'Get proposal details and votes',
      action: 'Get proposal',
    },
    {
      name: 'Create Proposal',
      value: 'createProposal',
      description: 'Submit new governance proposal',
      action: 'Create proposal',
    },
    {
      name: 'Cast Vote',
      value: 'castVote',
      description: 'Vote on proposal',
      action: 'Cast vote',
    },
    {
      name: 'Get Proposal Votes',
      value: 'getProposalVotes',
      description: 'Get all votes for proposal',
      action: 'Get proposal votes',
    },
    {
      name: 'Update Proposal',
      value: 'updateProposal',
      description: 'Update proposal (if allowed)',
      action: 'Update proposal',
    },
    {
      name: 'Get Treasury',
      value: 'getTreasury',
      description: 'Get DAO treasury information',
      action: 'Get treasury',
    },
    {
      name: 'Get Delegates',
      value: 'getDelegates',
      description: 'List voting delegates',
      action: 'Get delegates',
    },
    {
      name: 'Delegate Votes',
      value: 'delegateVotes',
      description: 'Delegate voting power',
      action: 'Delegate votes',
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
      name: 'Get All Pools',
      value: 'getAllPools',
      description: 'List all staking pools',
      action: 'Get all staking pools',
    },
    {
      name: 'Get Pool',
      value: 'getPool',
      description: 'Get staking pool details',
      action: 'Get staking pool details',
    },
    {
      name: 'Stake Tokens',
      value: 'stakeTokens',
      description: 'Stake API3 tokens in pool',
      action: 'Stake API3 tokens',
    },
    {
      name: 'Unstake Tokens',
      value: 'unstakeTokens',
      description: 'Unstake tokens from pool',
      action: 'Unstake tokens',
    },
    {
      name: 'Get Staking Positions',
      value: 'getStakingPositions',
      description: 'Get user\'s staking positions',
      action: 'Get staking positions',
    },
    {
      name: 'Get Staking Rewards',
      value: 'getStakingRewards',
      description: 'Get earned staking rewards',
      action: 'Get staking rewards',
    },
    {
      name: 'Claim Rewards',
      value: 'claimRewards',
      description: 'Claim staking rewards',
      action: 'Claim staking rewards',
    },
    {
      name: 'Update Position',
      value: 'updatePosition',
      description: 'Modify staking position',
      action: 'Update staking position',
    },
    {
      name: 'Get Staking History',
      value: 'getStakingHistory',
      description: 'Get staking transaction history',
      action: 'Get staking history',
    },
  ],
  default: 'getAllPools',
},
      // Parameter definitions
{
  displayName: 'Network',
  name: 'network',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getAllDapis'],
    },
  },
  default: '',
  description: 'Filter by blockchain network (ethereum, polygon, etc.)',
},
{
  displayName: 'Category',
  name: 'category',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getAllDapis'],
    },
  },
  default: '',
  description: 'Filter by data category',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getAllDapis'],
    },
  },
  options: [
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Inactive',
      value: 'inactive',
    },
    {
      name: 'All',
      value: '',
    },
  ],
  default: '',
  description: 'Filter by dAPI status',
},
{
  displayName: 'DApi ID',
  name: 'dapiId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getDapi'],
    },
  },
  default: '',
  description: 'The unique identifier of the dAPI',
},
{
  displayName: 'DApi ID',
  name: 'dapiId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['createDapi'],
    },
  },
  default: '',
  description: 'The unique identifier for the new dAPI subscription',
},
{
  displayName: 'Network',
  name: 'network',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['createDapi'],
    },
  },
  default: 'ethereum',
  description: 'Blockchain network for the dAPI',
},
{
  displayName: 'Sponsor Wallet',
  name: 'sponsorWallet',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['createDapi'],
    },
  },
  default: '',
  description: 'Wallet address that will sponsor the dAPI updates',
},
{
  displayName: 'Update Parameters',
  name: 'updateParameters',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['createDapi'],
    },
  },
  default: '{}',
  description: 'Configuration parameters for dAPI updates',
},
{
  displayName: 'DApi ID',
  name: 'dapiId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['updateDapi'],
    },
  },
  default: '',
  description: 'The unique identifier of the dAPI to update',
},
{
  displayName: 'Update Parameters',
  name: 'updateParameters',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['updateDapi'],
    },
  },
  default: '{}',
  description: 'New configuration parameters for the dAPI',
},
{
  displayName: 'Sponsor Wallet',
  name: 'sponsorWallet',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['updateDapi'],
    },
  },
  default: '',
  description: 'Wallet address that sponsors the dAPI updates',
},
{
  displayName: 'DApi ID',
  name: 'dapiId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['deleteDapi'],
    },
  },
  default: '',
  description: 'The unique identifier of the dAPI to delete',
},
{
  displayName: 'DApi ID',
  name: 'dapiId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getDapiData'],
    },
  },
  default: '',
  description: 'The unique identifier of the dAPI',
},
{
  displayName: 'Timestamp',
  name: 'timestamp',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getDapiData'],
    },
  },
  default: 0,
  description: 'Specific timestamp for data retrieval (optional)',
},
{
  displayName: 'DApi ID',
  name: 'dapiId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getDapiHistory'],
    },
  },
  default: '',
  description: 'The unique identifier of the dAPI',
},
{
  displayName: 'Start Time',
  name: 'startTime',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getDapiHistory'],
    },
  },
  default: 0,
  description: 'Start timestamp for historical data range',
},
{
  displayName: 'End Time',
  name: 'endTime',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getDapiHistory'],
    },
  },
  default: 0,
  description: 'End timestamp for historical data range',
},
{
  displayName: 'Interval',
  name: 'interval',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['dApis'],
      operation: ['getDapiHistory'],
    },
  },
  options: [
    {
      name: '1 Minute',
      value: '1m',
    },
    {
      name: '5 Minutes',
      value: '5m',
    },
    {
      name: '1 Hour',
      value: '1h',
    },
    {
      name: '1 Day',
      value: '1d',
    },
  ],
  default: '1h',
  description: 'Data aggregation interval',
},
{
  displayName: 'Network',
  name: 'network',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['getAllAirnodes'],
    },
  },
  default: '',
  description: 'Filter by blockchain network (e.g., ethereum, polygon)',
},
{
  displayName: 'Provider',
  name: 'provider',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['getAllAirnodes'],
    },
  },
  default: '',
  description: 'Filter by provider name',
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
  required: false,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['getAllAirnodes'],
    },
  },
  default: '',
  description: 'Filter by Airnode status',
},
{
  displayName: 'Airnode ID',
  name: 'airnodeId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['getAirnode', 'createRequest', 'getRequest', 'getEndpoints', 'updateAirnode', 'removeAirnode'],
    },
  },
  default: '',
  description: 'The unique identifier of the Airnode',
},
{
  displayName: 'Request ID',
  name: 'requestId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['getRequest'],
    },
  },
  default: '',
  description: 'The unique identifier of the request',
},
{
  displayName: 'Endpoint ID',
  name: 'endpointId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['createRequest'],
    },
  },
  default: '',
  description: 'The endpoint ID to call on the Airnode',
},
{
  displayName: 'Parameters',
  name: 'parameters',
  type: 'json',
  required: false,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['createRequest'],
    },
  },
  default: '{}',
  description: 'Parameters to pass to the Airnode endpoint',
},
{
  displayName: 'Sponsor Wallet',
  name: 'sponsorWallet',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['createRequest'],
    },
  },
  default: '',
  description: 'The sponsor wallet address for the request',
},
{
  displayName: 'Configuration',
  name: 'config',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['deployAirnode', 'updateAirnode'],
    },
  },
  default: '{}',
  description: 'The Airnode configuration object',
},
{
  displayName: 'Secrets',
  name: 'secrets',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['deployAirnode'],
    },
  },
  default: '{}',
  description: 'The secrets configuration for the Airnode',
},
{
  displayName: 'Network',
  name: 'networkDeploy',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['airnodes'],
      operation: ['deployAirnode'],
    },
  },
  default: '',
  description: 'The blockchain network to deploy the Airnode on',
},
{
  displayName: 'Network',
  name: 'network',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['getAllAuctions', 'createAuction', 'getOevRewards'],
    },
  },
  default: '',
  description: 'Blockchain network (e.g., ethereum, polygon)',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['getAllAuctions'],
    },
  },
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Completed', value: 'completed' },
    { name: 'Cancelled', value: 'cancelled' },
  ],
  default: 'active',
  description: 'Filter auctions by status',
},
{
  displayName: 'DAPI ID',
  name: 'dapiId',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['getAllAuctions', 'createAuction'],
    },
  },
  default: '',
  description: 'Filter by specific DAPI identifier',
},
{
  displayName: 'Auction ID',
  name: 'auctionId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['getAuction', 'placeBid', 'getAuctionBids', 'updateAuction', 'cancelAuction'],
    },
  },
  default: '',
  description: 'The auction identifier',
},
{
  displayName: 'Reserve Price',
  name: 'reservePrice',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['createAuction'],
    },
  },
  default: '',
  description: 'Minimum auction price in wei',
},
{
  displayName: 'Duration',
  name: 'duration',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['createAuction'],
    },
  },
  default: 3600,
  description: 'Auction duration in seconds',
},
{
  displayName: 'Bid Amount',
  name: 'bidAmount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['placeBid'],
    },
  },
  default: '',
  description: 'Bid amount in wei',
},
{
  displayName: 'Signature',
  name: 'signature',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['placeBid'],
    },
  },
  default: '',
  description: 'Cryptographic signature for the bid',
},
{
  displayName: 'New Reserve Price',
  name: 'newReservePrice',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['updateAuction'],
    },
  },
  default: '',
  description: 'Updated reserve price in wei',
},
{
  displayName: 'New Duration',
  name: 'newDuration',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['updateAuction'],
    },
  },
  default: 3600,
  description: 'Updated auction duration in seconds',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['getOevRewards'],
    },
  },
  default: '',
  description: 'Wallet address to get rewards for',
},
{
  displayName: 'Start Time',
  name: 'startTime',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['getOevRewards'],
    },
  },
  default: '',
  description: 'Start time for rewards query',
},
{
  displayName: 'End Time',
  name: 'endTime',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['oevAuctions'],
      operation: ['getOevRewards'],
    },
  },
  default: '',
  description: 'End time for rewards query',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['getAllProposals'],
    },
  },
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Pending', value: 'pending' },
    { name: 'Succeeded', value: 'succeeded' },
    { name: 'Failed', value: 'failed' },
    { name: 'Canceled', value: 'canceled' },
  ],
  default: '',
  description: 'Filter proposals by status',
},
{
  displayName: 'Category',
  name: 'category',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['getAllProposals'],
    },
  },
  default: '',
  description: 'Filter proposals by category',
},
{
  displayName: 'Voter',
  name: 'voter',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['getAllProposals'],
    },
  },
  default: '',
  description: 'Filter proposals by voter address',
},
{
  displayName: 'Proposal ID',
  name: 'proposalId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['getProposal'],
    },
  },
  default: '',
  description: 'The proposal ID',
},
{
  displayName: 'Title',
  name: 'title',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['createProposal'],
    },
  },
  default: '',
  description: 'The proposal title',
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['createProposal', 'updateProposal'],
    },
  },
  default: '',
  description: 'The proposal description',
},
{
  displayName: 'Actions',
  name: 'actions',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['createProposal'],
    },
  },
  default: '',
  description: 'JSON array of proposed actions',
},
{
  displayName: 'Signature',
  name: 'signature',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['createProposal', 'castVote', 'delegateVotes'],
    },
  },
  default: '',
  description: 'The cryptographic signature for the transaction',
},
{
  displayName: 'Proposal ID',
  name: 'proposalId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['castVote', 'getProposalVotes', 'updateProposal'],
    },
  },
  default: '',
  description: 'The proposal ID',
},
{
  displayName: 'Support',
  name: 'support',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['castVote'],
    },
  },
  options: [
    { name: 'For', value: 'for' },
    { name: 'Against', value: 'against' },
    { name: 'Abstain', value: 'abstain' },
  ],
  default: 'for',
  description: 'Vote support type',
},
{
  displayName: 'Voting Power',
  name: 'votingPower',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['castVote'],
    },
  },
  default: '',
  description: 'Amount of voting power to use',
},
{
  displayName: 'Order By',
  name: 'orderBy',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['getDelegates'],
    },
  },
  options: [
    { name: 'Voting Power', value: 'votingPower' },
    { name: 'Delegated Votes', value: 'delegatedVotes' },
    { name: 'Created Date', value: 'createdAt' },
  ],
  default: 'votingPower',
  description: 'Order delegates by field',
},
{
  displayName: 'Minimum Voting Power',
  name: 'minVotingPower',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['getDelegates'],
    },
  },
  default: '',
  description: 'Minimum voting power threshold for delegates',
},
{
  displayName: 'Delegatee',
  name: 'delegatee',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['daoGovernance'],
      operation: ['delegateVotes'],
    },
  },
  default: '',
  description: 'Address to delegate voting power to',
},
{
  displayName: 'Network',
  name: 'network',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getAllPools', 'getStakingPositions', 'getStakingRewards', 'getStakingHistory'],
    },
  },
  default: 'ethereum',
  description: 'The blockchain network',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Paused', value: 'paused' },
  ],
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getAllPools'],
    },
  },
  default: 'active',
  description: 'Filter pools by status',
},
{
  displayName: 'Minimum APR',
  name: 'minApr',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getAllPools'],
    },
  },
  default: 0,
  description: 'Minimum APR percentage to filter pools',
},
{
  displayName: 'Pool ID',
  name: 'poolId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getPool', 'stakeTokens', 'unstakeTokens', 'claimRewards'],
    },
  },
  default: '',
  description: 'The unique identifier of the staking pool',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['stakeTokens', 'unstakeTokens', 'updatePosition'],
    },
  },
  default: '',
  description: 'The amount of tokens to stake or unstake',
},
{
  displayName: 'Signature',
  name: 'signature',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['stakeTokens', 'unstakeTokens', 'claimRewards', 'updatePosition'],
    },
  },
  default: '',
  description: 'The wallet signature for the transaction',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getStakingPositions', 'getStakingRewards', 'getStakingHistory'],
    },
  },
  default: '',
  description: 'The wallet address to query',
},
{
  displayName: 'Start Time',
  name: 'startTime',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getStakingRewards', 'getStakingHistory'],
    },
  },
  default: '',
  description: 'Start time for filtering rewards or history',
},
{
  displayName: 'End Time',
  name: 'endTime',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getStakingRewards', 'getStakingHistory'],
    },
  },
  default: '',
  description: 'End time for filtering rewards or history',
},
{
  displayName: 'Position ID',
  name: 'positionId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['updatePosition'],
    },
  },
  default: '',
  description: 'The unique identifier of the staking position',
},
{
  displayName: 'Action',
  name: 'action',
  type: 'options',
  required: true,
  options: [
    { name: 'Increase', value: 'increase' },
    { name: 'Decrease', value: 'decrease' },
    { name: 'Compound', value: 'compound' },
  ],
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['updatePosition'],
    },
  },
  default: 'increase',
  description: 'The action to perform on the staking position',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'dApis':
        return [await executeDApisOperations.call(this, items)];
      case 'airnodes':
        return [await executeAirnodesOperations.call(this, items)];
      case 'oevAuctions':
        return [await executeOevAuctionsOperations.call(this, items)];
      case 'daoGovernance':
        return [await executeDaoGovernanceOperations.call(this, items)];
      case 'staking':
        return [await executeStakingOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeDApisOperations(
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
        case 'getAllDapis': {
          const network = this.getNodeParameter('network', i) as string;
          const category = this.getNodeParameter('category', i) as string;
          const status = this.getNodeParameter('status', i) as string;

          const queryParams: any = {};
          if (network) queryParams.network = network;
          if (category) queryParams.category = category;
          if (status) queryParams.status = status;

          const queryString = new URLSearchParams(queryParams).toString();
          const url = `${credentials.baseUrl}/dapis${queryString ? '?' + queryString : ''}`;

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

        case 'getDapi': {
          const dapiId = this.getNodeParameter('dapiId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dapis/${dapiId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createDapi': {
          const dapiId = this.getNodeParameter('dapiId', i) as string;
          const network = this.getNodeParameter('network', i) as string;
          const sponsorWallet = this.getNodeParameter('sponsorWallet', i) as string;
          const updateParameters = this.getNodeParameter('updateParameters', i) as string;

          let parsedUpdateParameters: any;
          try {
            parsedUpdateParameters = JSON.parse(updateParameters);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in updateParameters: ${error.message}`);
          }

          const body: any = {
            dapiId,
            network,
            sponsorWallet,
            updateParameters: parsedUpdateParameters,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/dapis`,
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

        case 'updateDapi': {
          const dapiId = this.getNodeParameter('dapiId', i) as string;
          const updateParameters = this.getNodeParameter('updateParameters', i) as string;
          const sponsorWallet = this.getNodeParameter('sponsorWallet', i) as string;

          let parsedUpdateParameters: any;
          try {
            parsedUpdateParameters = JSON.parse(updateParameters);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in updateParameters: ${error.message}`);
          }

          const body: any = {
            updateParameters: parsedUpdateParameters,
          };

          if (sponsorWallet) {
            body.sponsorWallet = sponsorWallet;
          }

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/dapis/${dapiId}`,
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

        case 'deleteDapi': {
          const dapiId = this.getNodeParameter('dapiId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/dapis/${dapiId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getDapiData': {
          const dapiId = this.getNodeParameter('dapiId', i) as string;
          const timestamp = this.getNodeParameter('timestamp', i) as number;

          const queryParams: any = {};
          if (timestamp > 0) queryParams.timestamp = timestamp.toString();

          const queryString = new URLSearchParams(queryParams).toString();
          const url = `${credentials.baseUrl}/dapis/${dapiId}/data${queryString ? '?' + queryString : ''}`;

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

        case 'getDapiHistory': {
          const dapiId = this.getNodeParameter('dapiId', i) as string;
          const startTime = this.getNodeParameter('startTime', i) as number;
          const endTime = this.getNodeParameter('endTime', i) as number;
          const interval = this.getNodeParameter('interval', i) as string;

          const queryParams: any = {
            interval,
          };

          if (startTime > 0) queryParams.startTime = startTime.toString();
          if (endTime > 0) queryParams.endTime = endTime.toString();

          const queryString = new URLSearchParams(queryParams).toString();
          const url = `${credentials.baseUrl}/dapis/${dapiId}/history?${queryString}`;

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

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (error instanceof NodeApiError || error instanceof NodeOperationError) {
        throw error;
      }

      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        throw new NodeApiError(this.getNode(), error);
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
          const network = this.getNodeParameter('network', i) as string;
          const provider = this.getNodeParameter('provider', i) as string;
          const status = this.getNodeParameter('status', i) as string;

          const queryParams: any = {};
          if (network) queryParams.network = network;
          if (provider) queryParams.provider = provider;
          if (status) queryParams.status = status;

          const queryString = Object.keys(queryParams).length > 0 
            ? '?' + new URLSearchParams(queryParams).toString() 
            : '';

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/airnodes${queryString}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
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
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createRequest': {
          const airnodeId = this.getNodeParameter('airnodeId', i) as string;
          const endpointId = this.getNodeParameter('endpointId', i) as string;
          const parameters = this.getNodeParameter('parameters', i) as string;
          const sponsorWallet = this.getNodeParameter('sponsorWallet', i) as string;

          let parsedParameters: any = {};
          try {
            parsedParameters = JSON.parse(parameters);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in parameters: ${error.message}`);
          }

          const body: any = {
            endpointId,
            parameters: parsedParameters,
            sponsorWallet,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/airnodes/${airnodeId}/requests`,
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

        case 'getRequest': {
          const airnodeId = this.getNodeParameter('airnodeId', i) as string;
          const requestId = this.getNodeParameter('requestId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/airnodes/${airnodeId}/requests/${requestId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getEndpoints': {
          const airnodeId = this.getNodeParameter('airnodeId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/airnodes/${airnodeId}/endpoints`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deployAirnode': {
          const config = this.getNodeParameter('config', i) as string;
          const secrets = this.getNodeParameter('secrets', i) as string;
          const network = this.getNodeParameter('networkDeploy', i) as string;

          let parsedConfig: any;
          let parsedSecrets: any;

          try {
            parsedConfig = JSON.parse(config);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in config: ${error.message}`);
          }

          try {
            parsedSecrets = JSON.parse(secrets);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in secrets: ${error.message}`);
          }

          const body: any = {
            config: parsedConfig,
            secrets: parsedSecrets,
            network,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/airnodes`,
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

        case 'updateAirnode': {
          const airnodeId = this.getNodeParameter('airnodeId', i) as string;
          const config = this.getNodeParameter('config', i) as string;

          let parsedConfig: any;
          try {
            parsedConfig = JSON.parse(config);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in config: ${error.message}`);
          }

          const body: any = {
            config: parsedConfig,
          };

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/airnodes/${airnodeId}`,
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

        case 'removeAirnode': {
          const airnodeId = this.getNodeParameter('airnodeId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/airnodes/${airnodeId}`,
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

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        if (error.response && error.response.body) {
          throw new NodeApiError(this.getNode(), error.response.body as any, {
            message: `API3 Oracle API error: ${error.response.body.message || error.message}`,
            httpCode: error.response.statusCode,
          });
        }
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
          const network = this.getNodeParameter('network', i) as string;
          const status = this.getNodeParameter('status', i) as string;
          const dapiId = this.getNodeParameter('dapiId', i) as string;
          
          const queryParams: any = {};
          if (network) queryParams.network = network;
          if (status) queryParams.status = status;
          if (dapiId) queryParams.dapiId = dapiId;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/oev/auctions`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: queryParams,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getAuction': {
          const auctionId = this.getNodeParameter('auctionId', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/oev/auctions/${auctionId}`,
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
          const dapiId = this.getNodeParameter('dapiId', i) as string;
          const network = this.getNodeParameter('network', i) as string;
          const reservePrice = this.getNodeParameter('reservePrice', i) as string;
          const duration = this.getNodeParameter('duration', i) as number;
          
          const body: any = {
            dapiId,
            network,
            reservePrice,
            duration,
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
          const bidAmount = this.getNodeParameter('bidAmount', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;
          
          const body: any = {
            bidAmount,
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
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/oev/auctions/${auctionId}/bids`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'updateAuction': {
          const auctionId = this.getNodeParameter('auctionId', i) as string;
          const newReservePrice = this.getNodeParameter('newReservePrice', i) as string;
          const newDuration = this.getNodeParameter('newDuration', i) as number;
          
          const body: any = {};
          if (newReservePrice) body.reservePrice = newReservePrice;
          if (newDuration) body.duration = newDuration;
          
          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/oev/auctions/${auctionId}`,
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
        
        case 'cancelAuction': {
          const auctionId = this.getNodeParameter('auctionId', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/oev/auctions/${auctionId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getOevRewards': {
          const address = this.getNodeParameter('address', i) as string;
          const network = this.getNodeParameter('network', i) as string;
          const startTime = this.getNodeParameter('startTime', i) as string;
          const endTime = this.getNodeParameter('endTime', i) as string;
          
          const queryParams: any = {
            address,
          };
          if (network) queryParams.network = network;
          if (startTime) queryParams.startTime = startTime;
          if (endTime) queryParams.endTime = endTime;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/oev/rewards`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: queryParams,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }
      
      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        if (error.httpCode) {
          throw new NodeApiError(this.getNode(), error);
        }
        throw new NodeOperationError(this.getNode(), error.message);
      }
    }
  }
  
  return returnData;
}

async function executeDaoGovernanceOperations(
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
          const category = this.getNodeParameter('category', i) as string;
          const voter = this.getNodeParameter('voter', i) as string;

          const queryParams = new URLSearchParams();
          if (status) queryParams.append('status', status);
          if (category) queryParams.append('category', category);
          if (voter) queryParams.append('voter', voter);

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dao/proposals${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
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
            url: `${credentials.baseUrl}/dao/proposals/${proposalId}`,
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
          const actions = this.getNodeParameter('actions', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;

          const body: any = {
            title,
            description,
            actions: JSON.parse(actions),
            signature,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/dao/proposals`,
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

        case 'castVote': {
          const proposalId = this.getNodeParameter('proposalId', i) as string;
          const support = this.getNodeParameter('support', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;
          const votingPower = this.getNodeParameter('votingPower', i) as string;

          const body: any = {
            support,
            signature,
          };

          if (votingPower) {
            body.votingPower = votingPower;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/dao/proposals/${proposalId}/votes`,
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

        case 'getProposalVotes': {
          const proposalId = this.getNodeParameter('proposalId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dao/proposals/${proposalId}/votes`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateProposal': {
          const proposalId = this.getNodeParameter('proposalId', i) as string;
          const description = this.getNodeParameter('description', i) as string;

          const body: any = {
            description,
          };

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/dao/proposals/${proposalId}`,
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

        case 'getTreasury': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dao/treasury`,
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
          const orderBy = this.getNodeParameter('orderBy', i) as string;
          const minVotingPower = this.getNodeParameter('minVotingPower', i) as string;

          const queryParams = new URLSearchParams();
          if (orderBy) queryParams.append('orderBy', orderBy);
          if (minVotingPower) queryParams.append('minVotingPower', minVotingPower);

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/dao/delegates${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delegateVotes': {
          const delegatee = this.getNodeParameter('delegatee', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;

          const body: any = {
            delegatee,
            signature,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/dao/delegate`,
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

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw new NodeApiError(this.getNode(), error);
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
        case 'getAllPools': {
          const network = this.getNodeParameter('network', i) as string;
          const status = this.getNodeParameter('status', i) as string;
          const minApr = this.getNodeParameter('minApr', i) as number;

          const qs: any = {};
          if (network) qs.network = network;
          if (status) qs.status = status;
          if (minApr > 0) qs.minApr = minApr;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/staking/pools`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPool': {
          const poolId = this.getNodeParameter('poolId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/staking/pools/${poolId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
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

        case 'getStakingPositions': {
          const address = this.getNodeParameter('address', i) as string;
          const network = this.getNodeParameter('network', i) as string;

          const qs: any = {};
          if (network) qs.network = network;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/staking/positions/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getStakingRewards': {
          const address = this.getNodeParameter('address', i) as string;
          const network = this.getNodeParameter('network', i) as string;
          const startTime = this.getNodeParameter('startTime', i) as string;
          const endTime = this.getNodeParameter('endTime', i) as string;

          const qs: any = {};
          if (network) qs.network = network;
          if (startTime) qs.startTime = startTime;
          if (endTime) qs.endTime = endTime;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/staking/rewards/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'claimRewards': {
          const poolId = this.getNodeParameter('poolId', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/staking/rewards/claim`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              poolId,
              signature,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updatePosition': {
          const positionId = this.getNodeParameter('positionId', i) as string;
          const action = this.getNodeParameter('action', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/staking/positions/${positionId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              action,
              amount,
              signature,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getStakingHistory': {
          const address = this.getNodeParameter('address', i) as string;
          const network = this.getNodeParameter('network', i) as string;
          const startTime = this.getNodeParameter('startTime', i) as string;
          const endTime = this.getNodeParameter('endTime', i) as string;

          const qs: any = {};
          if (network) qs.network = network;
          if (startTime) qs.startTime = startTime;
          if (endTime) qs.endTime = endTime;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/staking/history/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}
