<script>
	// create a new user with the email provided
	// send a invite link, which basically just logs the user in (updated time?)
	// invite token has a longer life
	// when user clicks email, invite token is checked
	// if valid token, user logs in
	// allow admin to resend invite link if needed, which would do the whole process over

	import {onMount} from 'svelte';

	import authStore from '../../stores/auth-store';
	import layoutStore from '../../stores/layout-store';
	import {validateEmail} from '../../utils/validateEmail';

	onMount(() => {
		layoutStore.setNavHeader(
			true,
			'Invite New Practitioner',
			'/admin/dashboard'
		);
		layoutStore.updateTermsVisibility(false);
	});

	let email;
	$: isValid = validateEmail(email);

	function login() {
		authStore.invitePractitioner(email);
	}
</script>

<svelte:head>
	<title>Heart Healing Hub - Invite New Practitioner</title>
</svelte:head>

<form on:submit|preventDefault={login} class="login-container">
	<div class="p1">
		Enter the email address of the Practitioner you would like to invite to the
		H3 platform.
	</div>
	<div class="footnote">
		Every account is tied to a unique email address. Make sure the email you are
		using to invite the Practitioner is the email they prefer to use.
	</div>
	<input
		type="email"
		bind:value={email}
		data-testid="email-input"
		placeholder="practitioner's email address" />
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
