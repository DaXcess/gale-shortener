<script lang="ts">
	import { SiGithub } from '@icons-pack/svelte-simple-icons';
	import { Dot } from 'lucide-svelte';
	import gale from '$lib/assets/gale.png';
</script>

<div class="flex h-screen flex-col">
	<main class="flex grow flex-col items-center justify-center">
		<h1 class="m-4 text-center text-4xl font-bold">Gale Shortener has been sunset</h1>

		<p class="text-sm text-gray-400">
			Modern versions of Gale have a neat feature called <a
				class="text-green-500 underline"
				href="https://github.com/Kesomannen/gale/wiki/Profile-sync/"
			>
				Profile sync
			</a>, which has been in limited beta for a while, but is now available for the public to use.
		</p>
		<p class="text-sm text-gray-400">
			This website has just been a pet project of mine, to learn some neat (and for this app, quite
			useless) features for modern websites.
		</p>
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
