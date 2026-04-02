# n8n-nodes-api3-oracle

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for API3 Oracle integration, providing access to 6 key resources including data feeds, airnodes, OEV auctions, governance, staking, and API providers. Enables seamless blockchain oracle data access and decentralized API management within your n8n workflows.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![API3](https://img.shields.io/badge/API3-Oracle-orange)
![Blockchain](https://img.shields.io/badge/Blockchain-Oracle-green)
![DeFi](https://img.shields.io/badge/DeFi-Integration-purple)

## Features

- **Data Feeds Management** - Access and manage API3's decentralized data feeds with real-time price and data streaming
- **Airnode Operations** - Deploy, configure, and monitor API3 Airnodes for blockchain-API connectivity
- **OEV Auction Integration** - Participate in and monitor Oracle Extractable Value auctions for MEV optimization
- **Governance Participation** - Create and vote on API3 DAO proposals with automated governance workflows
- **Staking Management** - Stake API3 tokens, monitor rewards, and manage delegation strategies
- **API Provider Network** - Connect with and manage API providers within the API3 ecosystem
- **Real-time Data Streaming** - Subscribe to live oracle data feeds with webhook support
- **Multi-chain Support** - Works across multiple blockchain networks supported by API3

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
| API Key | Your API3 Oracle API key for authentication | Yes |
| Environment | Environment (mainnet, testnet, development) | Yes |
| Network | Blockchain network (ethereum, polygon, avalanche, etc.) | Yes |
| Endpoint URL | Custom API endpoint URL (optional) | No |

## Resources & Operations

### 1. DataFeeds

| Operation | Description |
|-----------|-------------|
| Get Feed | Retrieve specific data feed information and current values |
| List Feeds | Get all available data feeds with filtering options |
| Subscribe | Subscribe to real-time data feed updates |
| Get History | Fetch historical data feed values and timestamps |
| Get Metadata | Retrieve data feed metadata and configuration |

### 2. Airnodes

| Operation | Description |
|-----------|-------------|
| Deploy | Deploy a new Airnode instance with configuration |
| Get Status | Check Airnode operational status and health |
| List Airnodes | Retrieve all Airnodes with filtering capabilities |
| Update Config | Update Airnode configuration and settings |
| Get Logs | Fetch Airnode operation logs and error reports |
| Remove | Deactivate or remove an Airnode deployment |

### 3. OevAuctions

| Operation | Description |
|-----------|-------------|
| Get Auction | Retrieve specific OEV auction details and status |
| List Auctions | Get all active and completed OEV auctions |
| Place Bid | Submit a bid for an OEV auction opportunity |
| Get Bids | Retrieve bid history and current bid status |
| Monitor | Set up monitoring for auction opportunities |

### 4. Governance

| Operation | Description |
|-----------|-------------|
| Get Proposal | Retrieve specific governance proposal details |
| List Proposals | Get all governance proposals with status filtering |
| Create Proposal | Submit a new governance proposal to the DAO |
| Vote | Cast vote on active governance proposals |
| Get Votes | Retrieve voting history and current vote status |
| Delegate | Delegate voting power to another address |

### 5. Staking

| Operation | Description |
|-----------|-------------|
| Stake Tokens | Stake API3 tokens for rewards and governance |
| Unstake | Unstake tokens with appropriate cooldown handling |
| Get Balance | Check staked token balance and rewards |
| Claim Rewards | Claim accumulated staking rewards |
| Get Pool Info | Retrieve staking pool information and APY |
| Update Delegation | Modify delegation settings and beneficiaries |

### 6. ApiProviders

| Operation | Description |
|-----------|-------------|
| Get Provider | Retrieve specific API provider information |
| List Providers | Get all registered API providers with filtering |
| Register | Register as a new API provider in the network |
| Update Profile | Update API provider profile and capabilities |
| Get Endpoints | Retrieve available API endpoints from providers |
| Monitor Usage | Track API usage statistics and performance |

## Usage Examples

```javascript
// Get real-time ETH/USD data feed
{
  "resource": "DataFeeds",
  "operation": "Get Feed",
  "parameters": {
    "feedId": "ETH-USD",
    "network": "ethereum",
    "includeHistory": false
  }
}
```

```javascript
// Monitor OEV auction opportunities
{
  "resource": "OevAuctions",
  "operation": "Monitor",
  "parameters": {
    "minValue": "1000",
    "maxSlippage": "0.5",
    "networks": ["ethereum", "polygon"],
    "webhookUrl": "https://your-domain.com/webhook"
  }
}
```

```javascript
// Stake API3 tokens for governance
{
  "resource": "Staking",
  "operation": "Stake Tokens",
  "parameters": {
    "amount": "5000",
    "poolId": "main-staking-pool",
    "autoCompound": true,
    "delegateVoting": "0x742D35Cc6639C0532FEb5416B2c4A7979a1f2d1F"
  }
}
```

```javascript
// Deploy new Airnode for API connectivity
{
  "resource": "Airnodes",
  "operation": "Deploy",
  "parameters": {
    "name": "weather-api-node",
    "config": {
      "apiUrl": "https://api.weather.com/v1",
      "endpoints": ["/current", "/forecast"],
      "updateInterval": 300
    },
    "network": "polygon"
  }
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | API key is missing or invalid | Check credentials configuration and API key validity |
| Network Timeout | Request timeout due to network issues | Increase timeout settings or check network connectivity |
| Insufficient Balance | Not enough tokens for staking/auction operations | Verify token balance and ensure sufficient funds |
| Feed Not Found | Requested data feed does not exist | Check feed ID spelling and availability on selected network |
| Rate Limit Exceeded | Too many API requests in time window | Implement request throttling or upgrade API plan |
| Invalid Proposal | Governance proposal format is incorrect | Review proposal schema and required parameters |

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
- **API3 Documentation**: [docs.api3.org](https://docs.api3.org)
- **API3 Discord**: [API3 Community](https://discord.gg/api3dao)