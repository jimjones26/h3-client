<script>
	import layoutStore from '../stores/layout-store';
	import NavHeader from '../components/NavHeader.svelte';
	import Loading from '../components/Loading.svelte';

	import routes from '../config/routes.js';
	import {guard} from '@beyonk/sapper-rbac';
	import {tick} from 'svelte';
	import {stores, goto} from '@sapper/app';

	const {page, session} = stores();

	const options = {
		routes,
		deny: () => goto('/')
		// we don't specify grant here, since we don't need to do anything.
	};

	// Listen to the page store.
	page.subscribe(async v => {
		await tick(); // let the previous routing finish first.
		guard(v.path, $session.profile, options);
	});

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
