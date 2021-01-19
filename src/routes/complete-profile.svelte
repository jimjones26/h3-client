<script>
	import {onMount} from 'svelte';
	import {stores} from '@sapper/app';
	import layoutStore from '../stores/layout-store';
	import userStore from '../stores/user-store';

	onMount(() => {
		layoutStore.setNavHeader(true, 'Complete My Profile', '/dashboard');
	});

	const {session} = stores();

	let step = 0;
	let genderPreference = 'none';
	let appointmentPreference;

	$: preferences = {
		genderPreference,
		appointmentPreference
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

	function updateGenderPreference(event) {
		console.log('VALUE: ', event.target.value);
		preferences.genderPreference = event.target.value;
	}
	function updateAppointmentPreference(event) {
		console.log('VALUE: ', event.target.value);
		preferences.appointmentPreference = event.target.value;
	}
	function save() {
		console.log('PREFERENCES: ', preferences);
		userStore.completeProfile($session.profile.id, preferences);
	}
</script>

<div class="complete-profile-container">
	{#if step === 0}
		<div class="p1">
			Do you have a gender preference for the Practitioner you want to search
			for?
		</div>
		<div>
			<fieldset id="gender">
				<div>
					<input
						type="radio"
						name="gender"
						value="none"
						on:change={updateGenderPreference} />no preference
				</div>
				<div>
					<input
						type="radio"
						name="gender"
						value="female"
						on:change={updateGenderPreference} />female
				</div>
				<div>
					<input
						type="radio"
						name="gender"
						value="male"
						on:change={updateGenderPreference} />male
				</div>
			</fieldset>
		</div>
	{:else if step === 1}
		<div class="p1">
			Do you prefer an in person appointment, or would a virtual appointment be
			ok?
		</div>
		<div>
			<div>
				<fieldset id="appointment">
					<div>
						<input
							type="radio"
							name="appointment"
							value="none"
							on:change={updateAppointmentPreference} />no preference
					</div>
					<div>
						<input
							type="radio"
							name="appointment"
							value="inPerson"
							on:change={updateAppointmentPreference} />in person
					</div>
					<div>
						<input
							type="radio"
							name="appointment"
							value="virtual"
							on:change={updateAppointmentPreference} />virtual
					</div>
				</fieldset>
			</div>
		</div>
	{:else if step === 2}
		<div class="p1">
			Alright, here is the info you gave us. Does everything look correct?
		</div>
		<div>
			<div class="email-phone">
				Gender Preference:
				{preferences.genderPreference}
			</div>
			<div class="email-phone">
				Appointment Preference:
				{preferences.appointmentPreference}
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
	.email-phone {
		font-size: 20px;
	}
</style>
