import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

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
			description: 'API key for authentication. Obtain from API3 Market dashboard.',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.api3.org/v1',
			description: 'Base URL for the API3 Oracle API',
		},
	];
}