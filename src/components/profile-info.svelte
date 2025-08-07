<script lang="ts">
	import { getImportData } from '$lib/thunderstore';
	import { Ban, LoaderCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let profile = $state<
		| { state: 'loading' }
		| { state: 'error' }
		| { state: 'available'; profileName: string; mods: number; community: string }
	>({ state: 'loading' });

	async function loadProfile(code: string) {
		try {
			profile = { state: 'loading' };

			const result = await getImportData(code);
			if (!result.success) {
				profile = { state: 'error' };
				return;
			}

			profile = { state: 'available', ...result.data };
		} catch {
			profile = { state: 'error' };
		}
	}

	let { code }: { code: string } = $props();

	onMount(async () => {
		await loadProfile(code);
	});
</script>

{#if profile.state === 'loading'}
	<div class="flex items-center gap-2 text-slate-400">
		<LoaderCircle class="size-5 animate-spin" />
		<span class="text-sm">Fetching profile details…</span>
	</div>
{:else if profile.state === 'error'}
	<div class="flex items-center gap-2 text-slate-400">
		<Ban class="size-5" />
		<span class="text-sm">Couldn't load profile information</span>
	</div>
{:else if profile.state === 'available'}
	<div
		class="w-full max-w-md space-y-4 rounded-lg border border-slate-700 bg-slate-900 p-6 shadow-lg lg:max-w-lg"
	>
		<div class="flex items-start justify-between">
			<h2 class="text-lg font-semibold text-white">
				Profile: <span class="text-slate-300">{profile.profileName}</span>
			</h2>
			<a
				class="text-xs text-nowrap text-green-400 hover:underline"
				href={`https://thunderstore.io/c/${profile.community}`}
				target="_blank"
			>
				View Community →
			</a>
		</div>

		<div class="flex items-center gap-6">
			<div class="flex items-center gap-2">
				<span class="text-sm text-slate-400">Mods:</span>
				<span class="font-medium text-white">{profile.mods}</span>
			</div>

			<div class="h-4 w-px bg-slate-700"></div>

			<div class="flex items-center gap-2">
				<span class="text-sm text-slate-400">Community:</span>
				<span class="font-medium text-white">{profile.community}</span>
			</div>
		</div>
	</div>
{/if}
