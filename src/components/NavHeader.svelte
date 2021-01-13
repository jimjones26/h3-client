<script>
	export let headerText = 'Header Text';
</script>

<div class="nav-header-container">
	<button type="submit" data-testid="submit-button"><svg class="button-icon">
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
	button {
		width: 50px;
		height: 50px;
		background: transparent;
		border: 0 transparent;
		color: var(--main-font-color);
		cursor: pointer;
		padding: 0px;
	}
	.button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		width: 24px;
		height: 24px;
	}
</style>
