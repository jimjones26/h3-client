<script>
	export let navText = null;
	export let urlPath = null;
	export let navDescription = null;
</script>

<a href={urlPath}>
	<div class="nav-header">
		{navText}<svg class="button-icon">
			<use xlink:href="../../images/icons.svg#arrow_forward" />
		</svg>
	</div>
	<div class="nav-description">{navDescription}</div>
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
	.nav-description {
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
