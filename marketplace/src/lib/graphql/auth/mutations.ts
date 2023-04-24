import { graphql } from '$houdini';

const CHALLENGE_NONCE_MUTATION = graphql(`
	mutation challenge($address: String!) {
		challenge(input: { address: $address }) {
			data
		}
	}
`);

const LOGIN_MUTATION = graphql(`
	mutation login($address: String!, $signature: String!, $message: String!) {
		login(input: { address: $address, signature: $signature, message: $message }) {
			data
		}
	}
`);

export { CHALLENGE_NONCE_MUTATION, LOGIN_MUTATION };
