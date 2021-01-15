<script>
	import {onMount} from 'svelte';
	import layoutStore from '../stores/layout-store';

	onMount(() => {
		layoutStore.setNavHeader(true, 'Create New Account', '/');
	});
</script>

<svelte:head>
	<title>Heart Healing Hub - Create New Account</title>
</svelte:head>
