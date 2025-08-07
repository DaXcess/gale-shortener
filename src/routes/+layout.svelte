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

	import OfflineReady from '$components/offline-ready.svelte';
	import NeedRefresh from '$components/need-refresh.svelte';

	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	let { children } = $props();

	const { updateServiceWorker, needRefresh, offlineReady } = useRegisterSW({
		immediate: true
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<OfflineReady visible={$offlineReady} onClose={() => offlineReady.update(() => false)} />
<NeedRefresh visible={$needRefresh} {updateServiceWorker} />
