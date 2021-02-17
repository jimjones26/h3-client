<script>
	import {onMount, onDestroy} from 'svelte';
	import {stores} from '@sapper/app';
	import userStore from '../../../stores/user-store';
	import layoutStore from '../../../stores/layout-store';
	import SecondaryNavItem from '../../../components/SecondaryNavItem.svelte';

	onMount(async () => {
		await userStore
			.getPractitionerProfileById($page.params.id)
			.then(layoutStore.updateLoadingState(false, null));

		await layoutStore.setNavHeader(
			true,
			`${$userStore.selectedPractitioner.user.first_name} ${$userStore.selectedPractitioner.user.last_name}`,
			'/clients/find-practitioner'
		);

		layoutStore.updateTermsVisibility(false);
	});

	const {page} = stores();

	onDestroy(() => {
		userStore.clearSelectedPractitioner();
	});

	let practitioner;
	$: practitioner = $userStore.selectedPractitioner;
</script>

<svelte:head>
	<title>Heart Healing Hub - Practitioner Profile</title>
</svelte:head>

<div class="detail-container">
	{#if practitioner}
		<div>
			<p>{practitioner.modalities}</p>
			<p>{practitioner.main_focus}</p>
			<p>{practitioner.affiliation}</p>
			<p>{practitioner.biography}</p>
		</div>
		<div>
			<SecondaryNavItem
				navText="add to favorites"
				urlPath="/clients/complete-profile"
				navDescription={`Not ready to make a decision on ${practitioner.user.first_name}? Add to your favorites and review later.`}
				canToggle={true}
				isFavorite={false} />
			<SecondaryNavItem
				navText="request appointment"
				urlPath="/clients/complete-profile"
				navDescription="Have you made your decision?
				Lets get your appointment scheduled." />
		</div>
	{/if}
</div>

<!-- {JSON.stringify($userStore.selectedPractitioner)} -->
<style>
	.detail-container {
		display: grid;
		grid-template-rows: 1fr auto;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}

	p {
		padding: 0;
		margin: 0;
	}
</style>
