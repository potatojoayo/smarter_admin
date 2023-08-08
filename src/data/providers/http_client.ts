import { GraphQLClient } from 'graphql-request';

class HttpClient {
	private static instance: HttpClient;

	private client = new GraphQLClient(
		import.meta.env.VITE_GRAPHQL_ENDPOINT,
		{
			credentials: 'include'
		}
	);

	public static getInstance(): HttpClient {
		if (!HttpClient.instance) {
			HttpClient.instance = new HttpClient();
		}
		return HttpClient.instance;
	}

	request = async (
		query: string,
		variables?: object
	) => {
		return await this.client.request(
			query,
			variables
		);
	};
}

export default HttpClient;
