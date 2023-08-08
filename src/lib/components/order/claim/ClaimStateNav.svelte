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

	let orderDetailStates = [
		'전체',
		'교환요청',
		'교환완료',
		'교환반려',
		'반품요청',
		'반품완료',
		'반품반려'
	];

	function getUrl(state) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('state', state);
		return '?' + queryParam.toString();
	}
</script>

<div class="flex">
	{#each orderDetailStates as orderDetailState}
		<a
			on:click|stopPropagation={() => {
				goto(getUrl(orderDetailState));
			}}
			class="group lg:text-md  text-md py-2  px-4 border-b-2
					cursor-pointer
					whitespace-nowrap
					flex
					min-w-[100px]
					{currentState === orderDetailState
				? getColor(orderDetailState)
				: 'hover:bg-gray-300'}"
		>
			<span class="mx-auto">
				{orderDetailState}
			</span>
		</a>
	{/each}
</div>
