<script>
	import layoutStore from '../stores/layout-store';
	import NavHeader from '../components/NavHeader.svelte';
	import Loading from '../components/Loading.svelte';
	export let segment;
</script>

{#if $layoutStore.loading}
	<Loading message={$layoutStore.loadingMessage} />
{:else}
	{#if $layoutStore.showNavHeader}
		<NavHeader headerText={$layoutStore.headerText} />
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
