<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronRight, LoaderCircle } from 'lucide-svelte';
	import ProfileInfo from './profile-info.svelte';

	let loading = $state(false);
	let error = $state('');
	let input = $state('');
	let code = $state('');

	let link = $state('');

	function generateLink(input: string) {
		const UUID_RX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		if (!UUID_RX.test(input)) throw 'Malformed profile code';

		const hex = input.replace(/-/g, '');
		const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

		const code = btoa(String.fromCharCode(...bytes))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');

		const url = new URL(window.location.href);

		return `${url.protocol}//${url.host}/?p=${code}`;
	}

	function submit() {
		error = '';
		link = '';
		code = '';

		try {
			link = generateLink(input);
			code = input;
		} catch (err) {
			if (typeof err === 'string') error = err;
			// Bold assumption
			else error = (err as Error).message;
		}
	}
</script>

<div class="flex flex-col items-center space-y-4">
	<form
		class="flex min-w-64 gap-2 md:min-w-96 lg:min-w-2xl"
		onsubmit={(e) => (e.preventDefault(), submit())}
	>
		<input
			disabled={loading}
			class={cn(
				'grow rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-gray-300 outline-0 transition-colors focus-within:border-gray-200 hover:border-slate-500 hover:focus-within:border-gray-200',
				error &&
					'border-red-500 focus-within:border-red-500 hover:border-red-500 hover:focus-within:border-red-500',
				loading &&
					'opacity-50 focus-within:border-slate-600 hover:border-slate-600 hover:focus-within:border-slate-600'
			)}
			bind:value={input}
			placeholder="Enter your profile code here"
		/>

		<button
			disabled={loading}
			class="flex size-10 cursor-pointer items-center justify-center rounded-full bg-green-600 transition-colors hover:bg-green-700 disabled:cursor-default disabled:bg-green-900 disabled:hover:bg-green-900"
			type="submit"
		>
			{#if loading}
				<LoaderCircle class="size-5 animate-spin text-gray-200" />
			{:else}
				<ChevronRight class="size-6" />
			{/if}
		</button>
	</form>

	{#if error}
		<p class="mt-1 text-red-500">{error}</p>
	{/if}

	{#if link}
		<div class="flex flex-col items-center">
			<p class="mb-1 text-sm text-slate-400">Short Link (click to copy)</p>
			<button
				class="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 font-mono text-sm transition hover:bg-slate-700"
				onclick={() => navigator.clipboard.writeText(link)}
				title="Click to copy"
			>
				{link}
			</button>
		</div>
	{/if}

	{#if code}
		<ProfileInfo {code} />
	{/if}
</div>
