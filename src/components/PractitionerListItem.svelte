<script>
	export let practitioner;
</script>

<a href="/">
	<div class="nav-header">
		{practitioner.user.first_name}
		{practitioner.user.last_name}<svg class="button-icon">
			<use xlink:href="../../images/icons.svg#arrow_forward" />
		</svg>
	</div>
	<div class="session-fee">
		${practitioner.session_fee}/{practitioner.session_time}
		minutes
	</div>
	<div class="modalities">
		<strong>HH Modalities:</strong>
		{practitioner.modalities}
	</div>
</a>

<style>
	a {
		display: grid;
		grid-template-rows: auto auto;
		text-decoration: none;
		color: var(--main-font-color);
		margin-bottom: 33px;
	}
	.nav-header {
		font-size: 24px;
	}
	.modalities {
		font-size: 16px;
		margin-top: 5px;
	}
	.button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		margin-left: 6px;
		width: 24px;
		height: 24px;
	}
</style>
