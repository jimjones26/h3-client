<script>
	import layoutStore from '../stores/layout-store';
	import NavHeader from '../components/NavHeader.svelte';
	import Loading from '../components/Loading.svelte';
	export let segment;
</script>

{#if $layoutStore.loading}
	<Loading message={$layoutStore.loadingMessage} />
{:else}
	<NavHeader />
	<main>
		<slot {segment} />
	</main>
{/if}

<style>
</style>
