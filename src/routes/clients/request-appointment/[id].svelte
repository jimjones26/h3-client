<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';
	import userStore from '../../../stores/user-store';
	import layoutStore from '../../../stores/layout-store';

	onMount(async () => {
		await userStore
			.getPractitionerProfileById($page.params.id)
			.then(layoutStore.updateLoadingState(false, null));

		await layoutStore.setNavHeader(
			true,
			'Request an Appointment',
			`/clients/practitioner-profile/${practitioner.user.id}`
		);

		layoutStore.updateTermsVisibility(false);
	});

	const {page} = stores();

	let practitioner;
	$: practitioner = $userStore.selectedPractitioner;
</script>

<svelte:head>
	<title>Heart Healing Hub - Request an Appointment</title>
</svelte:head>

<div class="detail-container">
	{#if practitioner}
		you are requesting an appointment with
		{practitioner.user.first_name}
		{practitioner.user.last_name}
	{/if}
</div>

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
