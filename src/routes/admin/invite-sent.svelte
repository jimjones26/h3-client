<script>
	import {onMount} from 'svelte';
	import layoutStore from '../../stores/layout-store';
	import PrimaryNavItem from '../../components/PrimaryNavItem.svelte';

	onMount(() => {
		layoutStore.setNavHeader(false, null, null);
	});
</script>

<div class="invite-sent-container">
	<div class="title">Success!</div>
	<div class="p1">An invite was sent to the email address you entered.</div>
	<PrimaryNavItem
		navText="Back to my Dashboard"
		urlPath="/admin/dashboard"
		navDescription="This will only take a few minutes. Let's get started." />
</div>

<style>
	.invite-sent-container {
		display: grid;
		grid-template-rows: auto auto auto auto 1fr;
		margin-right: 50px;
		margin-left: 50px;
		margin-bottom: 32px;
		margin-top: 40px;
	}
</style>
