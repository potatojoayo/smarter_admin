<script>
	import { dateToIsoDateString } from '../utils/dateToIsoDateString';

	export let max = dateToIsoDateString(
		new Date()
	);

	export let disabled = false;
	export let onInput;
	export let value;
	if (typeof value !== 'string') {
		value = dateToIsoDateString(value);
	}
</script>

<input
	{disabled}
	type="date"
	on:input={(e) => {
		if (onInput) {
			onInput(e);
		}
	}}
	class="w-[110px] group hover:bg-primary pt-1 pr-2 pb-1 pl-2 pk-2 rounded border text-sm hover:text-white h-11 hover:border-primary border-gray-300"
	bind:value
	{max}
/>

<style>
	input[type='date'] {
		position: relative;
	}

	input[type='date']::-webkit-calendar-picker-indicator {
		background: transparent;
		bottom: 0;
		color: transparent;
		cursor: pointer;
		height: auto;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: auto;
	}
</style>
