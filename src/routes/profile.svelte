<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Check, CircleX, Copy } from 'lucide-svelte';
	import ProfileInfo from '$components/profile-info.svelte';

	const UUID_RX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

	function toArrayBuffer(b64: string) {
		const binary = atob(b64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
		return bytes;
	}

	function toHex(buffer: Uint8Array) {
		return Array.prototype.map.call(buffer, (x) => ('00' + x.toString(16)).slice(-2)).join('');
	}

	function decodeShortId(short: string): string | null {
		if (UUID_RX.test(short)) {
			return short;
		}

		try {
			const b64 = short.replace(/-/g, '+').replace(/_/g, '/');
			const padded = b64 + '==='.slice((b64.length + 3) % 4);
			const bin = toArrayBuffer(padded);
			if (bin.length !== 16) return null;

			const hex = toHex(bin);
			return [
				hex.slice(0, 8),
				hex.slice(8, 12),
				hex.slice(12, 16),
				hex.slice(16, 20),
				hex.slice(20)
			].join('-');
		} catch {
			return null;
		}
	}

	const { id }: { id: string } = $props();

	let invalid = $state(false);
	let code = $state<string | null>(null);
	let copied = $state(false);

	onMount(() => {
		if (!id) {
			goto('/');
			return;
		}

		code = decodeShortId(id);
		console.log({ code });
		if (!code) {
			invalid = true;
			return;
		}

		// window.location.href = `gale://profile/import/${code}`;
	});

	function copyCode() {
		navigator.clipboard.writeText(code!);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-6 px-4 text-white">
	{#if invalid}
		<div class="rounded-lg border border-slate-700 bg-slate-900 p-4">
			<div class="flex items-center gap-2 text-lg font-bold">
				<CircleX class="size-6 text-red-500" />
				<span>Invalid profile code</span>
			</div>
			<p class="mt-1 ml-8 text-sm text-slate-400">
				The link may have been copied incorrectly or expired.
			</p>
		</div>
	{:else if code}
		<!-- Code Card -->
		<div
			class="w-full max-w-md space-y-4 rounded-lg border border-slate-700 bg-slate-900 p-6 shadow-lg"
		>
			<div class="space-y-1">
				<p class="font-medium text-slate-300">Profile Code</p>
				<button
					class="group flex w-full items-center justify-between rounded-md bg-slate-800 px-4 py-2 font-mono text-sm transition hover:bg-slate-700"
					onclick={copyCode}
				>
					<span class="truncate">{code}</span>
					{#if copied}
						<Check class="size-4 text-green-400" />
					{:else}
						<Copy class="size-4 text-slate-400 group-hover:text-white" />
					{/if}
				</button>
			</div>
			<p class="text-sm leading-relaxed text-slate-400">
				If you have <a
					class="text-green-500 underline"
					href="https://kesomannen.com/gale"
					target="_blank"
				>
					Gale
				</a>
				installed, this page should automatically open it and import the code. If not, you can copy the
				code and paste it manually into the app.
			</p>

			<button
				class="float-right cursor-pointer rounded-lg bg-green-700 px-4 py-2 text-xs transition-colors hover:bg-green-600"
				onclick={() => goto('/')}
			>
				Generate your own link
			</button>
		</div>

		<!-- Profile Info -->
		<ProfileInfo {code} />
	{/if}
</div>
