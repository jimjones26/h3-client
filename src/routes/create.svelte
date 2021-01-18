<script>
	import {onMount} from 'svelte';
	import authStore from '../stores/auth-store';
	import layoutStore from '../stores/layout-store';
	import {validateEmail} from '../utils/validateEmail';

	onMount(() => {
		layoutStore.setNavHeader(true, 'Create New Account', '/');
	});

	$: emailValid = validateEmail(email);

	let step = 0;
	let email = '2@gmail.com';
	let firstName = 'Bethany';
	let lastName = 'Jones';
	let phoneNumber = '9182998976';

	$: user = {
		email,
		firstName,
		lastName,
		phoneNumber
	};

	$: backButtonVisible = () => {
		if (step === 1 || step === 2 || step === 3) {
			return true;
		} else {
			return false;
		}
	};

	function next() {
		step++;
	}
	function back() {
		step--;
	}

	function save() {
		console.log('USER: ', user);
		authStore.createClient(user);
	}
</script>

<svelte:head>
	<title>Heart Healing Hub - Create New Account</title>
</svelte:head>
<div class="create-container">
	{#if step === 0}
		<div class="p1">
			Lets get started. What email address would you like to use?
		</div>
		<div>
			<input
				type="email"
				bind:value={email}
				data-testid="email-input"
				placeholder="your email address" />
		</div>
	{:else if step === 1}
		<div class="p1">
			Great! What is your name and the best phone number to contact you at?
		</div>
		<div>
			<input
				type="text"
				bind:value={firstName}
				data-testid="email-input"
				placeholder="your first name" /><input
				type="text"
				bind:value={lastName}
				data-testid="email-input"
				placeholder="your last name" /><input
				type="text"
				bind:value={phoneNumber}
				data-testid="email-input"
				placeholder="your phone number" />
		</div>
	{:else if step === 2}
		<div class="p1">
			Alright, here is the info you gave us. Does everything look correct?
		</div>
		<div>
			<div class="name">{firstName} {lastName}</div>
			<div class="email-phone">{email}</div>
			<div class="email-phone">{phoneNumber}</div>
		</div>
	{/if}
	<div class="buttons-container">
		{#if backButtonVisible()}
			<button on:click={back} class="button-left">
				<svg class="button-icon">
					<use xlink:href="../../images/icons.svg#arrow_back" />
				</svg><span>back</span></button>
		{/if}
		<button
			on:click={step <= 1 ? next : save}
			class="button-right"><span>{step === 2 ? 'save' : 'next'}</span>
			<svg class="button-icon">
				<use xlink:href="../../images/icons.svg#arrow_forward" />
			</svg></button>
	</div>
</div>

<style>
	.create-container {
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
	.buttons-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.p1 {
		font-size: 24px;
		font-weight: 400;
		line-height: 28px;
		margin-bottom: 19px;
	}
	.button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		width: 24px;
		height: 24px;
	}
	.name {
		font-size: 24px;
		font-weight: bold;
	}
	.email-phone {
		font-size: 20px;
	}
</style>
