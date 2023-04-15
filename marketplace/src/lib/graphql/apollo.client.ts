import { PUBLIC_GATEWAY_URL } from '$env/static/public';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client';

const httpLink = new HttpLink({ uri: PUBLIC_GATEWAY_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers
			// authorization: sessionStorage.getItem('token') || null
		}
	}));

	return forward(operation);
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: concat(authMiddleware, httpLink)
});

export { client };
