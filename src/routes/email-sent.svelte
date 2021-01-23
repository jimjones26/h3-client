<script>
	import {onMount} from 'svelte';
	import layoutStore from '../stores/layout-store';

	onMount(() => {
		layoutStore.setNavHeader(false, null, null);
	});
</script>

<div class="email-sent-container">
	<div class="title">Success!</div>
	<div class="p1">Check your email and follow the instructions.</div>
	<div class="p2">
		Not getting an email? Make sure you are checking the account for the email
		you used to login. Also check your spam folder.
	</div>
	<div><a href="/login">Try logging in again.</a></div>
	<div class="footer">You can close this window now.</div>
</div>

<style>
	.email-sent-container {
		display: grid;
		grid-template-rows: auto auto auto auto 1fr;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
	.p1 {
		margin-bottom: 19px;
	}
	.p2 {
		font-size: 16px;
		line-height: 19px;
		font-weight: 300;
		margin-bottom: 55px;
	}
</style>
