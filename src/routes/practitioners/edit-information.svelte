<script>
	import {onMount} from 'svelte';
	import layoutStore from '../../stores/layout-store';

	onMount(() => {
		layoutStore.setNavHeader(
			true,
			'Edit My Information',
			'/practitioners/dashboard'
		);
		layoutStore.updateTermsVisibility(false);
	});
</script>
