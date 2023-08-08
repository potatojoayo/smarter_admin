<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getColor } from '../../utils/getColor.js';
	import { todayOrderCountByState } from '../../../stores/order.js';

	export let state;
	let count = 0;

	function getUrl(state) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('page', 1);
		queryParam.set('state', state);
		return '?' + queryParam.toString();
	}

	let currentState;

	$: {
		currentState =
			$page.url.searchParams.get('state') ??
			'전체';
	}
	$: {
		todayOrderCountByState(state).then(
			(result) => (count = result)
		);
	}
</script>

<button
	on:click|stopPropagation={() => {
		goto(getUrl(state));
	}}
	class="group lg:text-sm  text-md py-2  px-4 border-b-2
					cursor-pointer
					whitespace-nowrap
					flex
					min-w-[100px]
					{currentState === state
		? getColor(state)
		: 'hover:bg-gray-50'}"
>
	<span class="mx-auto">
		{state}
		{count}
	</span>
</button>
