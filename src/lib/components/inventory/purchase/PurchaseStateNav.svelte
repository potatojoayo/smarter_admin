<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getColor } from '../../../utils/getColor.js';

	let currentState;

	$: {
		currentState =
			$page.url.searchParams.get('state') ??
			'전체';
	}

	let states = ['전체', '발주대기', '발주진행중'];

	function getUrl(state) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('state', state);
		return '?' + queryParam.toString();
	}
</script>

<div class="flex">
	{#each states as state}
		<a
			on:click|stopPropagation={() => {
				goto(getUrl(state));
			}}
			class="group lg:text-md  text-md py-2  px-4 border-b-2
					cursor-pointer
					whitespace-nowrap
					flex
					min-w-[100px]
					{currentState === state
				? getColor(state)
				: 'hover:bg-gray-300'}"
		>
			<span class="mx-auto">
				{state}
			</span>
		</a>
	{/each}
</div>
