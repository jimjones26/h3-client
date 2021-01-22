<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';
	import layoutStore from '../stores/layout-store';
	import userStore from '../stores/user-store';

	onMount(() => {
		layoutStore.setNavHeader(true, 'Complete My Profile', '/clients/dashboard');
		layoutStore.updateTermsVisibility(false);
	});

	const {session} = stores();

	let step = 0;

	const genderPreferences = ['none', 'male', 'female'];
	const appointmentPreferences = ['none', 'virtual', 'in person'];
	let genderPreference = genderPreferences[0];
	let appointmentPreference = appointmentPreferences[0];

	$: backButtonVisible = () => {
		if (step === 1 || step === 2 || step === 3) {
			return true;
		} else {
			return false;
		}
	};

	let checked = false;

	function next() {
		step++;
	}
	function back() {
		step--;
	}

	function save() {
		console.log('PREFERENCES: ', {genderPreference, appointmentPreference});
		userStore.completeProfile($session.profile.id, {
			genderPreference,
			appointmentPreference
		});
	}
</script>

<div class="complete-profile-container">
	{#if step === 0}
		<div class="p1">
			Do you have a gender preference for the Practitioner you want to search
			for?
		</div>
		<div>
			<fieldset id="genderPreference">
				{#each genderPreferences as genderPref}
					<label>
						<input
							type="radio"
							name="genderPreference"
							value={genderPref}
							bind:group={genderPreference} />
						<span>{genderPref}</span>
					</label>
				{/each}
			</fieldset>
		</div>
	{:else if step === 1}
		<div class="p1">
			Do you prefer an in person appointment, or would a virtual appointment be
			ok?
		</div>
		<div>
			<fieldset id="appointmentPreference">
				{#each appointmentPreferences as appointmentPref}
					<label>
						<input
							type="radio"
							name="appointmentPreference"
							value={appointmentPref}
							bind:group={appointmentPreference} />
						<span>{appointmentPref}</span>
					</label>
				{/each}
			</fieldset>
		</div>
	{:else if step === 2}
		<div class="p1">
			Alright, here is the info you gave us. Does everything look correct?
		</div>
		<div>
			<div class="email-phone">Gender Preference: {genderPreference}</div>
			<div class="email-phone">
				Appointment Preference:
				{appointmentPreference}
			</div>
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
	.complete-profile-container {
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
	fieldset {
		display: grid;
		border: 0px solid transparent;
		margin: 0px;
		padding: 0px;
		font-size: 20px;
	}
	.p1 {
		font-size: 24px;
		font-weight: 400;
		line-height: 28px;
		margin-bottom: 19px;
		margin-bottom: 53px;
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

	label {
		margin-bottom: 25px;
	}

	label > input[type='radio'] {
		display: none;
	}

	label > input[type='radio'] + *::before {
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 1.3rem;
		height: 1.3rem;
		margin-right: 0.6rem;
		border-radius: 50%;
		border-style: solid;
		border-width: 0.15rem;
		border-color: var(--main-font-color);
	}

	label > input[type='radio']:checked + *::before {
		background: radial-gradient(
			var(--main-font-color) 0%,
			var(--main-font-color) 40%,
			transparent 50%,
			transparent
		);
		border-color: var(--main-font-color);
	}
	label > input[type='radio']:checked + * {
		color: var(--main-font-color);
	}
</style>
