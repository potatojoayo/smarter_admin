import { GraphQLClient } from 'graphql-request';

const authClient = new GraphQLClient(
	import.meta.env.VITE_GRAPHQL_ENDPOINT,
	{
		credentials: 'include'
	}
);

export default authClient;
