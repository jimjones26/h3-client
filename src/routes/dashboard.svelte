<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';

	import layoutStore from '../stores/layout-store';

	import PrimaryNavItem from '../components/PrimaryNavItem.svelte';

	onMount(() => {
		layoutStore.setNavHeader(false, null);
	});

	const {session} = stores();
</script>

<svelte:head>
	<title>Heart Healing Hub</title>
</svelte:head>
<div class="dashboard-container">
	<div class="title">Hello, {$session.profile.firstName}</div>
	<div class="p1">
		{#if $session.profile.firstVisit}
			We need you to answer a few questions so we can complete your profile.
		{:else}Welcome back. What would you like to today?{/if}
	</div>
	<nav>
		{#if $session.profile.firstVisit}
			<PrimaryNavItem
				navText="Complete My Profile"
				urlPath="/complete-profile"
				navDescription="This will only take a few minutes. Let's get started." />
		{:else}some other navitems{/if}
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
	.dashboard-container {
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
	.title {
		font-size: 48px;
		line-height: 52px;
		margin-bottom: 19px;
		text-transform: capitalize;
	}
	.p1 {
		font-size: 24px;
		font-weight: 300;
		line-height: 28px;
		margin-bottom: 53px;
	}
	.footer {
		font-size: 16px;
		align-self: end;
		justify-self: center;
		text-align: center;
	}
</style>
