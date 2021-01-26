<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';

	import layoutStore from '../../stores/layout-store';

	import PrimaryNavItem from '../../components/PrimaryNavItem.svelte';

	onMount(() => {
		layoutStore.setNavHeader(false, null);
		layoutStore.updateTermsVisibility(true);
	});
	const {session} = stores();
</script>

<svelte:head>
	<title>Heart Healing Hub- Practitioner Dashboard</title>
</svelte:head>

<div class="dashboard-container">
	<div class="title">
		{#if $session.profile.firstName}
			Hi,
			{$session.profile.firstName}
		{:else}Hello{/if}
	</div>

	<div class="p1">
		{#if $session.profile.firstVisit}
			We need you to answer a few questions so we can complete your profile.
		{:else}Welcome back. What would you like to do today?{/if}
	</div>
	<nav>
		{#if $session.profile.firstVisit}
			<PrimaryNavItem
				navText="Complete My Profile"
				urlPath="/practitioners/complete-profile"
				navDescription="This will only take a few minutes. Let's get started." />
		{:else}
			<PrimaryNavItem
				navText="Setup My Practice"
				urlPath="/practitioners/practice-parameters"
				navDescription="Setup your standard hourly fee and session time, as well as your focus and a short biography." />
			<PrimaryNavItem
				navText="Edit My Profile"
				urlPath="/practitioners/edit-profile"
				navDescription="Change your name, address, or phone number." />
		{/if}
		<PrimaryNavItem
			navText="Logout"
			urlPath="/logout"
			navDescription="End your session on this and any other device you may have logged into." />
	</nav>
	{#if $session.profile.firstVisit}
		<div class="footer">
			You must complete your profile before you can continue. If you don’t have
			time now, you can come back later and finish.
		</div>
	{/if}
</div>
