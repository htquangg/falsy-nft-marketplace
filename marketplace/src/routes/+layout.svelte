<script>
	import '../app.css';
	import Footer from '../lib/footer/Footer.svelte';
	import Header from '../lib/header/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />
