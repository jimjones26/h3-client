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
		{:else if !$session.profile.setupComplete}
			Lets get your Practice setup and published in our system so Clients can
			find you.
		{:else}Welcome back. What would you like to do today?{/if}
	</div>
	<nav>
		{#if $session.profile.firstVisit}
			<PrimaryNavItem
				navText="Complete My Profile"
				urlPath="/practitioners/complete-profile"
				navDescription="This will only take a few minutes. Let's get started." />
		{:else if !$session.profile.firstVisit && !$session.profile.setupComplete}
			<PrimaryNavItem
				navText="Setup My Practice"
				urlPath="/practitioners/setup-practice"
				navDescription="Setup your standard hourly fee and session time, as well as your focus and a short biography." />
		{:else if !$session.profile.firstVisit && $session.profile.setupComplete}
			<PrimaryNavItem
				navText="Edit My Information"
				urlPath="/practitioners/edit-information"
				navDescription="Change your name, address, or phone number, or update the particulars of your practice." />
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
