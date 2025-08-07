<script lang="ts">
	import { page } from '$app/state';
	import Main from './main.svelte';
	import Profile from './profile.svelte';

	const profileCode = page.url.searchParams.get('p');
</script>

{#if profileCode}
	<Profile id={profileCode} />
{:else}
	<Main />
{/if}
