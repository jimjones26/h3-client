<script>
	import {onMount} from 'svelte';
	import authStore from '../../stores/auth-store';
	import layoutStore from '../../stores/layout-store';
	import {validateEmail} from '../../utils/validateEmail';

	onMount(() => {
		layoutStore.setNavHeader(true, 'Create New Account', '/');
		layoutStore.updateTermsVisibility(false);
	});

	$: emailValid = validateEmail(email);

	$: isValid = () => {
		if (step === 0) {
			console.log('hello');
			return emailValid;
		} else if (step === 1) {
			if (firstName && lastName && phoneNumber) {
				return true;
			}
			return false;
		} else {
			return true;
		}
	};

	let step = 0;
	let email;
	let firstName;
	let lastName;
	let phoneNumber;

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
			<input type="text" bind:value={firstName} placeholder="your first name" />
			<input type="text" bind:value={lastName} placeholder="your last name" />
			<input
				type="text"
				bind:value={phoneNumber}
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
			disabled={!isValid()}
			class="button-right"><span>{step === 2 ? 'save' : 'next'}</span>
			{#if isValid()}
				<svg class="button-icon">
					<use xlink:href="../../images/icons.svg#arrow_forward" />
				</svg>
			{:else}
				<svg class="button-icon">
					<use xlink:href="../../images/icons.svg#arrow_forward_disabled" />
				</svg>
			{/if}</button>
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
	.button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		width: 24px;
		height: 24px;
	}
	.name {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 5px;
	}
	.email-phone {
		font-size: 20px;
		margin-bottom: 5px;
	}
</style>
