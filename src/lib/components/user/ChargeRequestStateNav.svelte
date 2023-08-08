<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getColor } from '../../utils/getColor.js';

	let currentState;

	$: {
		currentState =
			$page.url.searchParams.get('state') ?? '';
	}

	let states = [
		'전체',
		'무통장입금',
		'결제완료'
	];

	function getUrl(query) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('state', query);
		return '?' + queryParam.toString();
	}
</script>

<div class=" flex">
	{#each states as s}
		<div
			on:click={() => {
				goto(getUrl(s));
			}}
			class="group lg:text-lg  text-md py-2  px-4 border-b-2
					cursor-pointer
					{currentState === s
				? getColor(s)
				: 'hover:bg-gray-300'}"
		>
			{s}
		</div>
	{/each}
</div>
