<script lang="ts">
	import { browser } from '$app/environment';
	import { graphql } from '$houdini';
	import { ethers } from 'ethers';
	import {
		Avatar,
		Button,
		Dropdown,
		DropdownDivider,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar
	} from 'flowbite-svelte';
	import { SiweMessage } from 'siwe';

	let user: boolean;

	const challengeMutation = graphql(`
		mutation challenge($address: String!) {
			challenge(input: { address: $address }) {
				data
			}
		}
	`);

	const loginMutation = graphql(`
		mutation login($address: String!, $signature: String!, $message: String!) {
			login(input: { address: $address, signature: $signature, message: $message })
		}
	`);

	const login = async () => {
		try {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send('eth_requestAccounts', []);
				const signer = provider.getSigner();

				const address = await signer.getAddress();

				const { data: challengeData, errors: challengeErrors } = await challengeMutation.mutate({
					address
				});

				if (!challengeData || (challengeErrors && challengeErrors?.length > 0)) {
					// TODO emit error toast
					return;
				}

				const nonce = challengeData.challenge?.data as string;

				const message = new SiweMessage({
					address,
					statement: 'Sign in with Ethereum to the app.',
					domain: window.location.host,
					uri: window.location.origin,
					nonce,
					chainId: 1,
					version: '1'
				}).prepareMessage();

				const signature = await signer.signMessage(message);

				const { data: loginData, errors: loginErrors } = await loginMutation.mutate({
					address,
					signature,
					message
				});

				if (
					!loginData ||
					!loginData.login ||
					!loginData.login.data ||
					(loginErrors && loginErrors?.length > 0)
				) {
					// TODO emit error toast
					return;
				}
			} else {
				if (browser) {
					// Redirect to metamask page
					window.location.href = 'https://metamask.io/';
				}
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				// TODO emit error toast
				return;
			}
		}
	};

	const logout = async () => {};
</script>

<header>
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img
				src="https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840"
				class="mr-3 h-6 sm:h-9"
				alt="Flowbite Logo"
			/>
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Falsy Marketplace</span
			>
		</NavBrand>
		<div class="flex items-center md:order-1">
			<NavUl {hidden}>
				<NavLi href="/" active={true}>Home</NavLi>
				<NavLi href="/">About</NavLi>
				<NavLi href="/">Services</NavLi>
				<NavLi href="/">Pricing</NavLi>
				<NavLi href="/">Contact</NavLi>
			</NavUl>
		</div>
		<div class="flex md:order-2">
			{#if !user}
				<Button color="purple" on:click={() => login()}>Connect Wallet</Button>
			{:else}
				<Avatar
					id="avatar-menu"
					src="https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840"
				/>
				<NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
				<Dropdown placement="bottom" triggeredBy="#avatar-menu">
					<DropdownItem>Profile</DropdownItem>
					<DropdownItem>Watchlist</DropdownItem>
					<DropdownItem>My Collections</DropdownItem>
					<DropdownDivider />
					<DropdownItem on:click={() => logout()}>Sign out</DropdownItem>
				</Dropdown>
			{/if}
		</div>
	</Navbar>
</header>
