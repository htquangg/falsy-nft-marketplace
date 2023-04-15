import { gql } from '@apollo/client';

const CHALLENGE_NONCE_MUTATION = gql(`
    mutation challengeNonce($address: String!) {
        challengeNonce(input: {address: $address}) {
            nonce
        }
    }
`);

const LOGIN_MUTATION = gql(`
    mutation login($address: String!, $signature: String!) {
        login(input: {address: $address, signature: $signature}) {
            token
        }
    }
`);

export { CHALLENGE_NONCE_MUTATION, LOGIN_MUTATION };
