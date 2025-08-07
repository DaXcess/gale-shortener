<script lang="ts">
	interface Props {
		visible: boolean;
		onClose: () => void;
	}

	let { visible, onClose }: Props = $props();
</script>

{#if visible}
	<div
		class="fixed right-6 bottom-6 flex gap-8 rounded-xl border border-slate-700 bg-slate-900 p-4"
	>
		<div>
			<p class="text-lg font-bold">Ready for offline use</p>
			<span class="text-sm text-gray-300">This app can now be used while you are offline</span>
		</div>

		<button
			class="cursor-pointer self-end rounded-md bg-green-700 px-3 py-2 text-sm font-semibold transition-colors hover:bg-green-600"
			onclick={onClose}
		>
			Awesomesauce
		</button>
	</div>
{/if}
