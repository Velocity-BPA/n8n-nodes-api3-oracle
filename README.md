# n8n-nodes-api3-oracle

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with API3's decentralized API services, offering 5 core resources for managing dAPIs, Airnodes, OEV auctions, DAO governance, and staking operations. Enable seamless Web3 data oracle functionality within your n8n automation workflows with real-time data feeds and decentralized API management.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![API3](https://img.shields.io/badge/API3-Oracle-ff6b35)
![Web3](https://img.shields.io/badge/Web3-Integration-brightgreen)
![Blockchain](https://img.shields.io/badge/Blockchain-Ready-purple)

## Features

- **dAPI Management** - Create, configure, and monitor decentralized APIs for reliable data feeds
- **Airnode Operations** - Deploy and manage first-party oracle nodes with comprehensive lifecycle control
- **OEV Auction Integration** - Participate in Oracle Extractable Value auctions for maximized revenue
- **DAO Governance Tools** - Submit proposals, cast votes, and track governance activities
- **Staking Management** - Stake API3 tokens, track rewards, and manage delegation strategies
- **Real-time Monitoring** - Access live data feeds and oracle performance metrics
- **Multi-chain Support** - Work across multiple blockchain networks supported by API3
- **Enterprise Security** - API key authentication with rate limiting and error handling

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-api3-oracle`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-api3-oracle
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-api3-oracle.git
cd n8n-nodes-api3-oracle
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-api3-oracle
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your API3 Oracle API key from the dashboard | Yes |
| Environment | Production or Sandbox environment | Yes |
| Network | Target blockchain network (Ethereum, Polygon, etc.) | Yes |
| Wallet Address | Your wallet address for signing transactions | No |

## Resources & Operations

### 1. DApis

| Operation | Description |
|-----------|-------------|
| Get All | Retrieve list of all available dAPIs |
| Get By ID | Fetch specific dAPI details and configuration |
| Create | Deploy a new decentralized API endpoint |
| Update | Modify existing dAPI parameters and settings |
| Delete | Remove dAPI from active deployments |
| Get Data Feed | Retrieve current data from dAPI endpoint |
| Get Historical Data | Access historical data points and trends |
| Monitor Status | Check dAPI health and performance metrics |

### 2. Airnodes

| Operation | Description |
|-----------|-------------|
| Get All | List all deployed Airnodes |
| Get By ID | Retrieve specific Airnode configuration |
| Deploy | Create and deploy new Airnode instance |
| Update Config | Modify Airnode configuration settings |
| Start | Activate Airnode operations |
| Stop | Pause Airnode processing |
| Get Logs | Access Airnode execution logs |
| Get Metrics | Retrieve performance and usage statistics |

### 3. OevAuctions

| Operation | Description |
|-----------|-------------|
| Get Active | List currently active OEV auctions |
| Get By ID | Fetch specific auction details |
| Place Bid | Submit bid for OEV auction |
| Get Bids | Retrieve your auction bid history |
| Get Results | Access completed auction outcomes |
| Calculate Revenue | Estimate potential OEV earnings |
| Get Statistics | View auction performance metrics |

### 4. DaoGovernance

| Operation | Description |
|-----------|-------------|
| Get Proposals | List all governance proposals |
| Get Proposal | Retrieve specific proposal details |
| Create Proposal | Submit new governance proposal |
| Vote | Cast vote on active proposal |
| Get Votes | Access voting history and records |
| Get Voting Power | Check current voting power balance |
| Delegate | Delegate voting power to another address |
| Get Delegates | List current delegation settings |

### 5. Staking

| Operation | Description |
|-----------|-------------|
| Get Pools | List available staking pools |
| Get Pool | Retrieve specific pool information |
| Stake Tokens | Stake API3 tokens in selected pool |
| Unstake Tokens | Withdraw staked tokens |
| Get Stakes | View current staking positions |
| Claim Rewards | Collect accumulated staking rewards |
| Get Rewards | Check pending reward amounts |
| Get History | Access staking transaction history |

## Usage Examples

```javascript
// Get real-time price data from dAPI
{
  "nodes": [{
    "name": "API3 Price Feed",
    "type": "n8n-nodes-api3-oracle.dapis",
    "parameters": {
      "operation": "getDataFeed",
      "dapiId": "ETH/USD",
      "includeMetadata": true
    }
  }]
}
```

```javascript
// Deploy new Airnode for API integration
{
  "nodes": [{
    "name": "Deploy Weather Airnode",
    "type": "n8n-nodes-api3-oracle.airnodes",
    "parameters": {
      "operation": "deploy",
      "name": "Weather Data Oracle",
      "apiUrl": "https://api.openweathermap.org/data/2.5",
      "endpoints": ["/weather", "/forecast"],
      "updateInterval": 300
    }
  }]
}
```

```javascript
// Participate in OEV auction
{
  "nodes": [{
    "name": "Place OEV Bid",
    "type": "n8n-nodes-api3-oracle.oevAuctions",
    "parameters": {
      "operation": "placeBid",
      "auctionId": "0x1234567890abcdef",
      "bidAmount": "1.5",
      "maxGasPrice": "50"
    }
  }]
}
```

```javascript
// Stake API3 tokens for rewards
{
  "nodes": [{
    "name": "Stake API3 Tokens",
    "type": "n8n-nodes-api3-oracle.staking",
    "parameters": {
      "operation": "stakeTokens",
      "poolId": "primary-pool",
      "amount": "1000",
      "lockPeriod": "90"
    }
  }]
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key in credentials configuration |
| Insufficient Balance | Not enough tokens for staking or bidding operation | Check wallet balance and add funds if needed |
| Network Timeout | Request timed out waiting for blockchain response | Retry operation or check network status |
| Rate Limit Exceeded | Too many requests sent within time window | Implement delays between requests or upgrade plan |
| Invalid dAPI ID | Specified dAPI does not exist or is inactive | Verify dAPI ID from available listings |
| Auction Ended | Attempting to bid on expired auction | Check auction status before placing bids |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-api3-oracle/issues)
- **API3 Documentation**: [API3 Docs](https://docs.api3.org/)
- **API3 Community**: [Discord Server](https://discord.gg/api3)