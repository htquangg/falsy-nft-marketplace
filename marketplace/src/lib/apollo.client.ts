import { ApolloClient, InMemoryCache } from '@apollo/client';
import dotenv from 'dotenv';
dotenv.config();

const GATEWAY_URL = process.env.GATEWAY_URL as string;

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: GATEWAY_URL
});

export default client;
