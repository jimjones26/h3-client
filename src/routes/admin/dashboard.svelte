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
	<title>Heart Healing Hub - Admin Dashboard</title>
</svelte:head>
<div class="dashboard-container">
	<div class="title">Hi, {$session.profile.firstName}</div>
	<div class="p1">Welcome back. What would you like to do today?</div>
	<nav>
		<PrimaryNavItem
			navText="Invite a New Practitioner"
			urlPath="/admin/invite"
			navDescription="Send an email to a Practitioner so they can participate in H3." />

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

<style>
</style>
