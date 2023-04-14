import { ethers } from 'ethers';
import { writable, type Writable } from 'svelte/store';
import { sign } from 'web3-token';

export const authStore: Writable<unknown> = writable();

export async function login(): Promise<void> {
	if (window.ethereum) {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();

			const token = await sign(async (msg: string) => await signer.signMessage(msg), '1d');
			authStore.set(signer.address);
		} catch (error) {
			/* empty */
		}
	}
}

export async function logout(): Promise<void> {
	authStore.set(null);
}
