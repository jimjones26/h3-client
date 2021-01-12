<script>
	export let headerText = 'Header Text';
</script>

<div class="nav-header-container">
	<button type="submit" data-testid="submit-button"><span
			class="material-icons button-icon">
			arrow_back
		</span></button>
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
	button {
		width: 50px;
		height: 50px;
		background: transparent;
		border: 0 transparent;
		color: var(--main-font-color);
		cursor: pointer;
	}
</style>
