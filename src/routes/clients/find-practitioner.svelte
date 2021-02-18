<script>
	import {onMount} from 'svelte';
	import layoutStore from '../../stores/layout-store';
	import userStore from '../../stores/user-store';
	import PractitionerListItem from '../../components/PractitionerListItem.svelte';

	onMount(() => {
		layoutStore.setNavHeader(true, 'Find a Practitioner', '/clients/dashboard');
		layoutStore.updateTermsVisibility(false);
		userStore.clearSelectedPractitioner();
	});

	if (process.browser) {
		userStore
			.retrieveAllPractitioners()
			.then(layoutStore.updateLoadingState(false, null));
	}
</script>

<svelte:head>
	<title>Heart Healing Hub - Find a Practitioner</title>
</svelte:head>

<div class="find-container">
	<div class="p1">Showing all Practitioners.</div>
	<div>
		{#each $userStore.practitioners as practitioner}
			<PractitionerListItem {practitioner} />
		{/each}
	</div>
</div>

<style>
	.find-container {
		display: grid;
		grid-template-rows: auto 1fr;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
</style>
