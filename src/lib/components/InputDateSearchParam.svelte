<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { dateToIsoDateString } from '../utils/dateToIsoDateString';

	export let max = dateToIsoDateString(
		new Date()
	);
	export let param;
	let value = dateToIsoDateString(
		$page.url.searchParams.get(param)
	);

	const changeValueHandler = async () => {
		let query = new URLSearchParams(
			$page.url.searchParams.toString()
		);
		let datetime = new Date(value);
		if (param === 'dateTo') {
			datetime.setDate(datetime.getDate() + 1);
		}
		datetime.setHours(0);
		datetime.setMinutes(0);
		datetime.setSeconds(0);
		query.set(param, datetime.toISOString());
		await goto(`?${query.toString()}`);
	};
</script>

<input
	type="date"
	class="w-[110px] group pt-1 pr-2 pb-1 pl-2 pk-2 rounded border-none shadow text-sm  h-11 hover:bg-gray-200 "
	bind:value
	{max}
	on:change|stopPropagation={changeValueHandler}
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
