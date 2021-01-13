<script>
	import {goto} from '@sapper/app';
	import layoutStore from '../stores/layout-store';
	import NavHeader from '../components/NavHeader.svelte';
	import Loading from '../components/Loading.svelte';
	export let segment;

	async function navigateBack(event) {
		await goto(event.detail);
	}
</script>

{#if $layoutStore.loading}
	<Loading message={$layoutStore.loadingMessage} />
{:else}
	{#if $layoutStore.showNavHeader}
		<NavHeader
			headerText={$layoutStore.headerText}
			on:navigateBack={navigateBack}
			referringUrl={$layoutStore.referringUrl} />
	{/if}
	<main>
		<slot {segment} />
	</main>
{/if}

<style>
	main {
		display: grid;
		grid-template-rows: 1fr;
		grid-row: 2 / 3;
	}
</style>
