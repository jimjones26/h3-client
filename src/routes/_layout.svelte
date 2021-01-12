<script>
	import NavHeader from '../components/NavHeader.svelte';
	export let segment;
</script>

<NavHeader />

<main>
	<slot {segment} />
</main>

<style>
</style>
