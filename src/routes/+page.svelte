<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import OfflineReady from '$components/offline-ready.svelte';
	import NeedRefresh from '$components/need-refresh.svelte';
	import Generator from '$components/generator.svelte';
	import { SiGithub } from '@icons-pack/svelte-simple-icons';
	import { Dot } from 'lucide-svelte';
	import gale from '$lib/assets/gale.png';

	const { updateServiceWorker, needRefresh, offlineReady } = useRegisterSW({
		immediate: true
	});
</script>

<div class="flex h-screen flex-col">
	<main class="flex grow flex-col items-center justify-center">
		<h1 class="m-8 text-center text-4xl font-bold">Gale Shortener</h1>

		<OfflineReady visible={$offlineReady} onClose={() => offlineReady.update(() => false)} />
		<NeedRefresh visible={$needRefresh} {updateServiceWorker} />

		<Generator />
	</main>

	<footer class="flex flex-col items-center gap-2 p-4">
		<div class="flex items-center gap-2 text-slate-500">
			<a
				href="https://github.com/DaXcess/gale-shortener"
				class="text-slate-500 transition-colors hover:text-slate-200"
				target="_blank"
			>
				<SiGithub size={32} />
			</a>
			<Dot />
			<a
				class=" opacity-50 transition-opacity hover:opacity-100"
				href="https://kesomannen.com/gale"
				target="_blank"
			>
				<img class="size-8" src={gale} alt="Gale logo" />
			</a>
		</div>

		<p class="mt-1 text-center text-sm text-slate-400">Not affiliated with Kesomannen or Gale</p>
	</footer>
</div>
