import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class API3OracleApi implements ICredentialType {
	name = 'api3OracleApi';
	displayName = 'API3 Oracle API';
	documentationUrl = 'https://docs.api3.org/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API key for authentication. Can be obtained from the API3 Market dashboard.',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api3.org/api/v1',
			required: true,
			description: 'Base URL for the API3 Oracle API',
		},
	];
}