<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let currentMembership;

	$: {
		currentMembership =
			$page.url.searchParams.get('membership') ??
			'';
	}

	let memberships = [
		'전체',
		'일반회원',
		'우수회원',
		'최우수회원'
	];

	function getUrl(query) {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('membership', query);
		return '?' + queryParam.toString();
	}
</script>

<div class=" flex">
	{#each memberships as m}
		<button
			on:click={() => {
				goto(getUrl(m));
			}}
			class="group   py-2  px-4 border-b-2
					cursor-pointer
					{currentMembership === m
				? 'border-primary '
				: 'hover:bg-gray-300'}"
		>
			{m}
		</button>
	{/each}
</div>
