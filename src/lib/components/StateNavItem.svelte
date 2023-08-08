<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getColor } from '../utils/getColor.js';

	export let state;
	let count = 0;

	function getUrl(state) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('page', 1);
		queryParam.set('state', state);
		queryParam.set('keyword', '');
		return '?' + queryParam.toString();
	}

	let currentState;

	$: {
		currentState =
			$page.url.searchParams.get('state') ??
			'전체';
	}
</script>

<button
	on:click|stopPropagation={() => {
		goto(getUrl(state));
	}}
	class="group lg:text-sm  text-md py-2 px-4 rounded shadow
					cursor-pointer
					whitespace-nowrap
					flex
					{currentState === state
		? getColor(state)
		: 'hover:bg-gray-100 bg-white '}"
>
	<span class="mx-auto">
		{state}
	</span>
</button>
