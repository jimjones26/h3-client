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
		<ul>
			<li>hello</li>
			<li>another link</li>
		</ul>
	{:else}
		<div class="title">Hello!</div>
		<div class="p1">
			<strong>Heart Healing Hub</strong>
			helps people connect with Counselors, to begin the process of healing the
			heart.
		</div>
		<div>
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
		</div>
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
	ul {
		list-style-type: none;
		padding: 0px 0px 0px 0px;
		margin: 0px 0px 0px 0px;
	}
</style>
