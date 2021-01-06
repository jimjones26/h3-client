<script>
	import {goto, stores} from '@sapper/app';
	import scopes from '../utils/scopes';

	const {session} = stores();
</script>

<svelte:head>
	<title>Heart Healing Hub</title>
</svelte:head>
<div class="index-container">
	{#if $session.authenticated}
		<div class="title">Hello, {$session.profile.firstName}</div>
		<div class="p1">Welcome back. What would you like to today?</div>
		{#if $session.profile.scope.includes(scopes.practitionerScope)}
			WE HAVE A PRACTITIONER
		{/if}
		{#if $session.profile.scope.includes(scopes.clientScope)}
			WE HAVE A CLIENT
		{/if}
	{:else}
		<div class="title">Hello!</div>
		<div class="p1">
			<strong>Heart Healing Hub</strong>
			helps people connect with Counselors, to begin the process of healing the
			heart.
		</div>
	{/if}
</div>

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
		font-weight: 500;
		line-height: 52px;
		margin-bottom: 19px;
		text-transform: capitalize;
	}
	.p1 {
		font-size: 24px;
		font-weight: 400;
		line-height: 28px;
		margin-bottom: 19px;
	}
</style>
