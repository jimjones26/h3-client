<script>
	export let navText = null;
	export let urlPath = null;
	export let navDescription = null;
	export let canToggle = false;
	export let isFavorite = null;
</script>

<!-- if this is a toggle link,on click will fire the toggleValue function and change the icon -->
<a href={urlPath}>
	<div class="nav-header">
		{navText}<svg class="button-icon">
			{#if canToggle === true}
				{#if !isFavorite === true}
					<use xlink:href="../../images/icons.svg#add" />
				{:else}
					<use xlink:href="../../images/icons.svg#remove" />
				{/if}
			{:else}
				<use xlink:href="../../images/icons.svg#arrow_forward" />
			{/if}
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
		margin-top: 33px;
	}
	.nav-header {
		font-size: 24px;
		text-align: right;
	}
	.nav-description {
		font-size: 16px;
		margin-top: 5px;
		text-align: right;
	}
	.button-icon {
		vertical-align: middle;
		margin-bottom: 2px;
		margin-left: 6px;
		width: 24px;
		height: 24px;
	}
</style>
