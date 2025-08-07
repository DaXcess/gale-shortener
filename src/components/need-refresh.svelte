<script lang="ts">
	interface Props {
		visible: boolean;
		updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
	}

	let { visible, updateServiceWorker }: Props = $props();
</script>

{#if visible}
	<div
		class="fixed right-6 bottom-6 flex gap-8 rounded-xl border border-slate-700 bg-slate-900 p-4"
	>
		<div>
			<p class="text-lg font-bold">New update available</p>
			<span class="text-sm text-gray-300">
				A new version of this app is available.
				<br />
				You can update by refreshing the page.
			</span>
		</div>

		<button
			class="cursor-pointer self-end rounded-md bg-green-700 px-3 py-2 text-sm font-semibold transition-colors hover:bg-green-600"
			onclick={() => updateServiceWorker()}
		>
			Refresh for me
		</button>
	</div>
{/if}
