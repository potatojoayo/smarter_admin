<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getColor } from '../../utils/getColor.js';

	let currentState;

	$: {
		currentState =
			$page.url.searchParams.get('state') ?? '';
	}

	let productStates = [
		'전체',
		'판매중',
		'품절',
		'숨김'
	];

	function getUrl(query) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('state', query);
		queryParam.set('page', 1);
		return '?' + queryParam.toString();
	}
</script>

<div class=" flex space-x-2 w-fit">
	{#each productStates as ps}
		<button
			on:click={() => {
				goto(getUrl(ps));
			}}
			class="group text-sm py-2  px-4 bg-white shadow rounded
					cursor-pointer
					{currentState === ps
				? getColor(ps)
				: 'hover:bg-gray-100'}"
		>
			{ps}
		</button>
	{/each}
</div>
