<script>
	import {goto, stores} from '@sapper/app';
	import authStore from '../stores/auth-store';

	const {session} = stores();

	let email = '1@1.com';
	$: isValid = validateEmail(email);

	function validateEmail(email) {
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(String(email).toLowerCase());
	}

	function login() {
		authStore.login(email);
	}
</script>

<svelte:head>
	<title>Heart Healing Hub - Login</title>
</svelte:head>

{#if $authStore.loading}
	we are loading
{:else}
	{#if $session.authenticated}
		you are already logged in
	{:else if $authStore.emailSent}
		email was sent. you can close this window
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
			<button
				type="submit"
				disabled={!isValid}
				data-testid="submit-button">submit<span
					class="material-icons button-icon">
					arrow_forward
				</span></button>
		</form>
	{/if}
	{#if $authStore.error}{$authStore.message}{/if}
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
	input {
		border: 0 transparent;
		background-color: transparent;
		font-size: 20px;
		line-height: 20px;
		font-weight: 500;
		color: var(--main-font-color);
		caret-color: var(--main-font-color);
		align-self: center;
		margin-left: -1px;
	}

	input:focus {
		outline: none;
	}

	::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: var(--input-placeholder);
		opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: var(--input-placeholder);
	}

	::-ms-input-placeholder {
		/* Microsoft Edge */
		color: var(--input-placeholder);
	}

	button {
		background: transparent;
		border: 0 transparent;
		font-size: 20px;
		font-weight: 400;
		color: var(--main-font-color);
		cursor: pointer;
		justify-self: end;
		margin-right: -11px;
	}

	button:disabled {
		color: var(--input-placeholder);
		cursor: not-allowed;
	}

	button:active:enabled {
		color: orange;
	}

	button:focus {
		outline: none;
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
	}

	.button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		margin-left: 5px;
		font-size: 20px;
	}
</style>
