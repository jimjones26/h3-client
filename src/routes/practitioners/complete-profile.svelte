<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';
	import layoutStore from '../../stores/layout-store';
	import userStore from '../../stores/user-store';

	onMount(() => {
		layoutStore.setNavHeader(
			true,
			'Complete My Profile',
			'/practitioners/dashboard'
		);
		layoutStore.updateTermsVisibility(false);
	});

	const {session} = stores();

	let step = 0;

	let id = $session.profile.id;
	let firstName;
	let lastName;
	let phoneNumber;
	let businessName;
	let address;
	let city;
	let state;
	let zip;

	$: practitioner = {
		id,
		firstName,
		lastName,
		phoneNumber,
		businessName,
		address,
		city,
		state,
		zip
	};

	$: backButtonVisible = () => {
		if (step === 1 || step === 2 || step === 3) {
			return true;
		} else {
			return false;
		}
	};

	$: isValid = () => {
		if (step === 0) {
			if (firstName && lastName && phoneNumber) {
				return true;
			}
			return false;
		} else if (step === 1) {
			if (address && businessName && city && state && zip) {
				return true;
			}
			return false;
		} else {
			return true;
		}
	};

	function next() {
		step++;
	}
	function back() {
		step--;
	}

	async function save() {
		console.log('USER: ', practitioner);
		await userStore.completePractitionerProfile(practitioner);
		await userStore.completeExtendedPractitionerProfile(practitioner);
	}
</script>

<svelte:head>
	<title>Heart Healing Hub - Complete Profile</title>
</svelte:head>

<div class="complete-profile-container">
	{#if step === 0}
		<div class="p1">
			What is your name and the phone number you prefer to use?
		</div>
		<div>
			<input type="text" bind:value={firstName} placeholder="your first name" />
			<input type="text" bind:value={lastName} placeholder="your last name" />
			<input
				type="text"
				bind:value={phoneNumber}
				placeholder="your phone number" />
		</div>
	{:else if step === 1}
		<div class="p1">
			What is the name of your business, and what mailing address would you like
			to use?
		</div>
		<div>
			<input
				type="text"
				bind:value={businessName}
				placeholder="your business name" />
			<input type="text" bind:value={address} placeholder="street address" />
			<input type="text" bind:value={city} placeholder="city" />
			<input type="text" bind:value={state} placeholder="state" />
			<input type="text" bind:value={zip} placeholder="zip code" />
		</div>
	{:else if step === 2}
		<div class="p1">
			Alright, here is the info you gave us. Does everything look correct?
		</div>
		<div>
			<div class="email-phone bold">{firstName} {lastName}</div>
			<div class="email-phone">{phoneNumber}</div><br />
			<div class="email-phone bold">{businessName}</div>
			<div class="email-phone">{address}</div>
			<div class="email-phone">{city}, {state}</div>
			<div class="email-phone">{zip}</div>
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
	.complete-profile-container {
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
	.email-phone {
		font-size: 20px;
		margin-bottom: 5px;
	}
	.bold {
		font-weight: bold;
	}
</style>
