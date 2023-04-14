<script lang="ts">
	import { authStore, login, logout } from '$lib/store/auth';
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
	$: user = $authStore;
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
				<NavLi href="/about">About</NavLi>
				<NavLi href="/services">Services</NavLi>
				<NavLi href="/pricing">Pricing</NavLi>
				<NavLi href="/contact">Contact</NavLi>
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
