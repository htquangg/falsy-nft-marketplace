<script lang="ts">
	import { authStore, login } from '$lib/store/auth';

	$: user = $authStore;
</script>

<header>
	<nav
		class="sticky inset-0 z-10 block h-max w-full max-w-full rounded-none border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4"
	>
		<div class="flex items-center text-gray-900">
			<a
				href="/"
				class="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
			>
				Falsy Marketplace
			</a>
			<ul class="ml-auto mr-8 hidden items-center gap-6 lg:flex">
				<!-- <li class="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
					<a class="flex items-center" href="/"> Pages </a>
				</li> -->
			</ul>
			{#if !user}
				<button
					class="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
					type="button"
					data-ripple-light="true"
					on:click={() => login()}
				>
					<span>Connect Wallet</span>
				</button>
			{:else}
				<img
					class="relative inline-block h-12 w-12 rounded-full object-cover object-center"
					alt="Image placeholder"
					src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
				/>
			{/if}
		</div>
		<div
			class="block h-0 w-full basis-full overflow-hidden text-blue-gray-900 transition-all duration-300 ease-in lg:hidden"
			data-collapse="sticky-navar"
		>
			<ul class="mt-2 mb-4 flex flex-col gap-2 pb-2">
				<!-- <li class="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
					<a class="flex items-center" href="/"> Docs </a>
				</li> -->
				{#if !user}
					<button
						class="mb-2 block w-full rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
						data-ripple-light="true"
						on:click={() => login()}
					>
						<span>Connect Wallet</span>
					</button>
				{:else}
					<img
						class="relative inline-block h-12 w-12 rounded-full object-cover object-center"
						alt="Image placeholder"
						src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
					/>
				{/if}
			</ul>
		</div>
	</nav>
</header>
