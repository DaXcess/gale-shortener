<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/gale.png';

	// Yuck, but I guess the only way?
	import '@fontsource/poppins/100.css';
	import '@fontsource/poppins/200.css';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import '@fontsource/poppins/900.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Gale Shortener</title>

	<meta name="title" content="Gale Shortener" />
	<meta name="description" content="Turn Thunderstore profile codes into easily sharable links" />
	<meta name="language" content="English" />
</svelte:head>

{@render children?.()}
