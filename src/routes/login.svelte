<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';
	import authStore from '../stores/auth-store';
	import layoutStore from '../stores/layout-store';
	import {validateEmail} from '../utils/validateEmail';

	const {session} = stores();

	onMount(() => {
		layoutStore.setNavHeader(true, 'Login', '/');
		layoutStore.updateTermsVisibility(false);
	});

	let email;
	$: isValid = validateEmail(email);

	function login() {
		authStore.login(email);
	}
</script>

<svelte:head>
	<title>Heart Healing Hub - Login</title>
</svelte:head>

{#if $session.authenticated}
	you are already logged in
{:else}
	<form on:submit|preventDefault={login} class="login-container">
		<div class="p1">
			Enter your email address. We will send a link you can use to log in.
		</div>
		<div class="footnote">
			Your account is tied to your email address, so enter the same email you
			used to create your account.
		</div>
		<input
			type="email"
			bind:value={email}
			data-testid="email-input"
			placeholder="your email address" />
		<div class="buttons-container">
			<button type="submit" disabled={!isValid} class="button-right">submit
				{#if isValid}
					<svg class="button-icon">
						<use xlink:href="../../images/icons.svg#arrow_forward" />
					</svg>
				{:else}
					<svg class="button-icon">
						<use xlink:href="../../images/icons.svg#arrow_forward_disabled" />
					</svg>
				{/if}
			</button>
		</div>
	</form>
{/if}

<style>
	.login-container {
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
	.p1 {
		font-size: 24px;
		font-weight: 400;
		line-height: 28px;
		margin-bottom: 19px;
	}
	.footnote {
		font-size: 16px;
		line-height: 19px;
		font-weight: 300;
		margin-bottom: 53px;
	}
	.button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		width: 24px;
		height: 24px;
	}
</style>
