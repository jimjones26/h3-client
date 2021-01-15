<script>
	import {onMount} from 'svelte';
	import layoutStore from '../stores/layout-store';

	onMount(() => {
		layoutStore.setNavHeader(true, 'Complete My Profile', '/dashboard');
	});
	/* 
What am I trying to acomplish on this screen?
I need to capture two default data points from a new user.
- practitioner gender preference
- appointment type preference

Practitioner Gender Preference
- none
- male
- female

Appointment Preference
- none
- in person
- virtual

*/
</script>

<div class="complete-profile-container">complete my profile</div>

<style>
	.complete-profile-container {
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
</style>
