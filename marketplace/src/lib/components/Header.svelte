<script lang="ts">
	import { browser } from '$app/environment';
	import {
		CHALLENGE_NONCE_MUTATION,
		LOGIN_MUTATION,
		client,
		type AuthenticationDto_Input,
		type ChallengeDto_Input,
		type NonceDto,
		type TokenDto
	} from '$lib/graphql';
	import { error } from '@sveltejs/kit';
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
	import { sign } from 'web3-token';

	$: isAuthenticated = false;

	const login = async () => {
		if (window.ethereum) {
			try {
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = await provider.getSigner();

				const { data: nonceDto, errors: challengeErrors } = await client.mutate<
					NonceDto,
					ChallengeDto_Input
				>({
					mutation: CHALLENGE_NONCE_MUTATION,
					variables: {
						address: signer.address
					}
				});

				if (challengeErrors && challengeErrors?.length > 0) {
					throw error(403, challengeErrors[0].message);
				}

				const signature = await sign(async (msg: string) => await signer.signMessage(msg), {
					expires_in: '1d',
					nonce: nonceDto?.nonce
				});

				const { data: tokenDto, errors: authenticateErrors } = await client.mutate<
					TokenDto,
					AuthenticationDto_Input
				>({
					mutation: LOGIN_MUTATION,
					variables: {
						address: signer.address,
						signature
					}
				});

				if (authenticateErrors && authenticateErrors?.length > 0) {
					throw error(403, authenticateErrors[0].message);
				}

				isAuthenticated = true;
			} catch (err: any) {
				throw error(403, err?.message);
			}
		} else {
			if (browser) {
				// Redirect to metamask page
				window.location.href = 'https://metamask.io/';
			}
		}
	};

	const logout = () => {
		isAuthenticated = false;
	};
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
			{#if !isAuthenticated}
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
