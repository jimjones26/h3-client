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
		{#if $layoutStore.showTerms}
			<div class="terms-layout">
				<span class="terms">Terms of Use</span><span class="cookie">Cookie
					Policy</span>
			</div>
		{/if}
	</main>
{/if}

<style>
	main {
		display: grid;
		grid-template-rows: 1fr auto;
		grid-row: 2 / 3;
	}
	.terms-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-left: 50px;
		margin-right: 50px;
		margin-bottom: 40px;
	}
	.terms {
		justify-self: start;
	}
	.cookie {
		justify-self: end;
	}
</style>
