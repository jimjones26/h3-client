<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';

	import scopes from '../utils/scopes';

	import layoutStore from '../stores/layout-store';

	import PrimaryNavItem from '../components/PrimaryNavItem.svelte';

	onMount(() => {
		layoutStore.setNavHeader(false, null);
	});

	const {session} = stores();
</script>

<!-- {JSON.stringify({$session})} -->
<svelte:head>
	<title>Heart Healing Hub</title>
</svelte:head>
<div class="index-container">
	{#if $session.authenticated}
		<div class="title">Hello, {$session.profile.firstName}</div>
		<div class="p1">
			{#if $session.profile.firstVisit}
				We need you to answer a few questions so we can complete your profile.
			{:else}Welcome back. What would you like to today?{/if}
		</div>
		<nav>
			<PrimaryNavItem
				navText="Complete My Profile"
				urlPath="/complete-profile"
				navDescription="This will only take a few minutes. Let's get started." />
		</nav>
		<div class="footer">
			You must complete your profile before you can continue. If you don’t have
			time now, you can come back later and finish.
		</div>
	{:else}
		<div class="title">Hello!</div>
		<div class="p1">
			<strong>Heart Healing Hub</strong>
			helps people connect with Counselors, to begin the process of healing the
			heart.
		</div>
		<nav>
			<PrimaryNavItem
				navText="Find out More"
				urlPath="/learn-more"
				navDescription="Suspendisse orci pellentesque at sollicitudin malesuada amet cursus dictum faucibus." />
			<PrimaryNavItem
				navText="Login"
				urlPath="/login"
				navDescription="Did you register an account already? Click here to enter your login information." />
			<PrimaryNavItem
				navText="Register a New Account"
				urlPath="/register"
				navDescription="Setup a new account and get started!" />
		</nav>
	{/if}
</div>

<!-- check to see if this is first visit -->
<!-- {#if $session.profile.scope}
	{#if $session.profile.scope.includes(scopes.practitionerScope)}
		WE HAVE A PRACTITIONER
	{/if}
	{#if $session.profile.scope.includes(scopes.clientScope)}
		WE HAVE A CLIENT
		{#if !$session.profile.firstVisit}First Visit{/if}
	{/if}
{/if} -->

<!-- {#if $session.authenticated}
		{#if $session.profile.scope.includes(scopes.practitionerScope)}
			WE HAVE A PRACTITIONER
		{/if}
		<a href="/logout">logout</a>
		<a href="/profile">profile</a>
	{/if} -->
<style>
	.index-container {
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
