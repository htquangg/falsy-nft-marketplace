<script lang="ts">
	import { authStore, login, logout } from '$lib/store/auth';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		Button
	} from 'flowbite-svelte';
	$: user = $authStore;
</script>

<header>
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img
				src="https://flowbite.com/docs/images/logo.svg"
				class="mr-3 h-6 sm:h-9"
				alt="Flowbite Logo"
			/>
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Falsy</span>
		</NavBrand>
		<div class="flex items-center md:order-2" />
		<NavUl {hidden}>
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/services">Services</NavLi>
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
		{#if !user}
			<Button color="purple" on:click={() => login()}>Connect Wallet</Button>
		{:else}
			<Avatar id="avatar-menu" src="https://flowbite.com/docs/images/logo.svg" />
			<NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
			<Dropdown placement="bottom" triggeredBy="#avatar-menu">
				<DropdownItem>Profile</DropdownItem>
				<DropdownItem>Watchlist</DropdownItem>
				<DropdownItem>My Collections</DropdownItem>
				<DropdownDivider />
				<DropdownItem on:click={() => logout()}>Sign out</DropdownItem>
			</Dropdown>
		{/if}
	</Navbar>
</header>
