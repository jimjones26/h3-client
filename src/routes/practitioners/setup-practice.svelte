<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';
	import layoutStore from '../../stores/layout-store';
	import practitionerStore from '../../stores/practitioner-store';

	onMount(() => {
		layoutStore.setNavHeader(
			true,
			'Setup My Practice',
			'/practitioners/dashboard'
		);
		layoutStore.updateTermsVisibility(false);
	});

	const {session} = stores();

	let step = 0;

	let userId = $session.profile.id;
	let modalities;
	let sessionFee;
	let sessionTime;
	let mainFocus;
	let affiliation;
	let experience;
	let biography;

	$: practiceInfo = {
		userId,
		modalities,
		sessionFee,
		sessionTime,
		mainFocus,
		affiliation,
		experience,
		biography
	};

	$: backButtonVisible = () => {
		if (step === 1 || step === 2 || step === 3 || step === 4) {
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

	$: isValid = () => {
		return true;
		/* if (step === 0) {
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
		} */
	};

	async function save() {
		console.log('save: ', practiceInfo);
		practitionerStore.completePracticeSetup(practiceInfo);
	}
</script>

<svelte:head>
	<title>Heart Healing Hub - Setup Practice</title>
</svelte:head>

<div class="setup-practice-container">
	{#if step === 0}
		<div class="p1">
			What is your session fee (in dollars) and your standard session time (in
			minutes)?
		</div>
		<div>
			<input type="text" bind:value={sessionFee} placeholder="session fee" />
			<input type="text" bind:value={sessionTime} placeholder="session time" />
		</div>
	{:else if step === 1}
		<div class="p1">What is the main focus of your practice?</div>
		<div>
			<textarea
				type="text"
				bind:value={mainFocus}
				placeholder="your main focus" />
		</div>
	{:else if step === 2}
		<div class="p1">What is your denominational affiliation?</div>
		<div>
			<textarea
				type="text"
				bind:value={affiliation}
				placeholder="denominational affiliation" />
		</div>
	{:else if step === 3}
		<div class="p1">How many years of experience do you have?</div>
		<div>
			<input
				type="text"
				bind:value={experience}
				placeholder="years of experience" />
		</div>
	{:else if step === 4}
		<div class="p1">
			Write a short biography so prospective clients can get to know you better.
		</div>
		<div>
			<textarea
				type="text"
				bind:value={biography}
				placeholder="your biography" />
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
			on:click={step <= 3 ? next : save}
			disabled={!isValid()}
			class="button-right"><span>{step === 4 ? 'save' : 'next'}</span>
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
	.setup-practice-container {
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

	textarea:focus {
		outline: none;
	}
</style>
