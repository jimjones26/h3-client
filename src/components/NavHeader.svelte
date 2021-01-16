<script>
	import {createEventDispatcher} from 'svelte';

	export let headerText = 'Header Text';
	export let referringUrl = null;

	const dispatch = createEventDispatcher();
</script>

<div class="nav-header-container">
	<button
		class="header-button"
		type="submit"
		data-testid="submit-button"
		on:click={() => dispatch('navigateBack', referringUrl)}><svg
			class="header-button-icon">
			<use xlink:href="../../images/icons.svg#arrow_back" />
		</svg></button>
	<span class="header-text">{headerText}</span>
</div>

<style>
	.nav-header-container {
		display: grid;
		grid-template-columns: 50px 1fr;
		margin-top: 24px;
		margin-bottom: -13px;
	}
	.header-text {
		font-size: 24px;
		font-weight: 500;
		align-self: center;
		margin-bottom: 1px;
	}
	.header-button {
		width: 50px;
		height: 50px;
		background: transparent;
		border: 0 transparent;
		color: var(--main-font-color);
		cursor: pointer;
		padding: 0px;
		margin-right: 0px;
	}
	.header-button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		width: 24px;
		height: 24px;
	}
</style>
