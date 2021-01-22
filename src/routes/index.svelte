<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';

	import {goto} from '@sapper/app';

	import layoutStore from '../stores/layout-store';

	import PrimaryNavItem from '../components/PrimaryNavItem.svelte';

	onMount(() => {
		layoutStore.setNavHeader(false, null);
		layoutStore.updateTermsVisibility(true);
		if ($session.authenticated) {
			goto('/clients/dashboard');
		}
	});

	const {session} = stores();
</script>

<svelte:head>
	<title>Heart Healing Hub</title>
</svelte:head>
<div class="index-container">
	<div class="title">Hello!</div>
	<div class="p1">
		<strong>Heart Healing Hub</strong>
		helps people connect with Counselors, to begin the process of healing the
		heart.
	</div>
	<nav>
		<PrimaryNavItem
			navText="Learn More"
			urlPath="/learn-more"
			navDescription="Suspendisse orci pellentesque at sollicitudin malesuada amet cursus dictum faucibus." />
		<PrimaryNavItem
			navText="Login"
			urlPath="/login"
			navDescription="Did you register an account already? Click here to enter your login information." />
		<PrimaryNavItem
			navText="Create a New Account"
			urlPath="/clients/create"
			navDescription="Setup a new account and get started!" />
	</nav>
</div>

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
</style>
