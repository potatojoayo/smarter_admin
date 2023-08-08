<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getSubcontractorColor } from '../../utils/getSubcontractorColor.js';

	let currentSubcontractor;

	$: {
		currentSubcontractor =
			$page.url.searchParams.get(
				'subcontractor'
			) ?? subcontractors[0];
	}

	export let subcontractors;

	function getUrl(subcontractor) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set(
			'subcontractor',
			subcontractor
		);
		return '?' + queryParam.toString();
	}
</script>

<div class="flex  w-fit space-x-2">
	{#each subcontractors as subcontractor}
		<button
			on:click|stopPropagation={() => {
				goto(getUrl(subcontractor));
			}}
			class="group text-sm py-2  px-4 bg-white
					cursor-pointer
					whitespace-nowrap
					flex
					rounded shadow
					{currentSubcontractor === subcontractor
				? getSubcontractorColor(subcontractor)
				: 'hover:bg-gray-100'}"
		>
			<span class="mx-auto">
				{subcontractor}
			</span>
		</button>
	{/each}
</div>
