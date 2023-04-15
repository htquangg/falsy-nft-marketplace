<script lang="ts">
	import { page } from '$app/stores';
	import { Alert } from 'flowbite-svelte';
</script>

<Alert color="red">
	<span class="font-medium">{$page?.error?.message}</span>
</Alert>
