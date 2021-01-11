<script>
	export let message = 'default message';
</script>

<div class="container">
	<div class="dot-pulse" />
	<div class="message">{message}</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: 1fr 1fr;
	}
	.message {
		align-self: start;
		justify-self: center;
		font-size: 24px;
		margin-top: 15px;
	}
	/**
    * ==============================================
    * Dot Pulse
    * ==============================================
    */
	.dot-pulse {
		margin-bottom: 15px;
		align-self: end;
		justify-self: center;
		position: relative;
		left: -9999px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: var(--main-font-color);
		color: var(--main-font-color);
		box-shadow: 9999px 0 0 -5px var(--main-font-color);
		animation: dotPulse 1.5s infinite linear;
		animation-delay: 0.25s;
	}

	.dot-pulse::before,
	.dot-pulse::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: var(--main-font-color);
		color: var(--main-font-color);
	}

	.dot-pulse::before {
		box-shadow: 9984px 0 0 -5px var(--main-font-color);
		animation: dotPulseBefore 1.5s infinite linear;
		animation-delay: 0s;
	}

	.dot-pulse::after {
		box-shadow: 10014px 0 0 -5px var(--main-font-color);
		animation: dotPulseAfter 1.5s infinite linear;
		animation-delay: 0.5s;
	}

	@keyframes dotPulseBefore {
		0% {
			box-shadow: 9984px 0 0 -5px var(--main-font-color);
		}
		30% {
			box-shadow: 9984px 0 0 2px var(--main-font-color);
		}
		60%,
		100% {
			box-shadow: 9984px 0 0 -5px var(--main-font-color);
		}
	}

	@keyframes dotPulse {
		0% {
			box-shadow: 9999px 0 0 -5px var(--main-font-color);
		}
		30% {
			box-shadow: 9999px 0 0 2px var(--main-font-color);
		}
		60%,
		100% {
			box-shadow: 9999px 0 0 -5px var(--main-font-color);
		}
	}

	@keyframes dotPulseAfter {
		0% {
			box-shadow: 10014px 0 0 -5px var(--main-font-color);
		}
		30% {
			box-shadow: 10014px 0 0 2px var(--main-font-color);
		}
		60%,
		100% {
			box-shadow: 10014px 0 0 -5px var(--main-font-color);
		}
	}
</style>
