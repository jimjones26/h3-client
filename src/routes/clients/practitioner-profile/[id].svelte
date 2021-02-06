<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';
	import userStore from '../../../stores/user-store';
	import layoutStore from '../../../stores/layout-store';

	onMount(() => {
		layoutStore.setNavHeader(
			true,
			'Find a Practitioner',
			'/clients/find-practitioner'
		);
		layoutStore.updateTermsVisibility(false);
	});

	const {session} = stores();
	const {page} = stores();

	if (process.browser) {
		userStore
			.getPractitionerProfileById($page.params.id)
			.then(layoutStore.updateLoadingState(false, null));
	}
	//
</script>

<svelte:head>
	<title>Heart Healing Hub - Practitioner Profile</title>
</svelte:head>

{JSON.stringify($userStore.selectedPractitioner)}
