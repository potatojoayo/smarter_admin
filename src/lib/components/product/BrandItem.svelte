<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: currentBrand =
		$page.url.searchParams.get('brand') ?? '';

	function getUrl() {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);

		queryParam.set('brand', brand.name);
		queryParam.set('page', 1);
		return '?' + queryParam.toString();
	}

	export let brand;
</script>

<a
	class="pl-4
	{currentBrand === brand.name
		? 'bg-primary text-white'
		: 'bg-white hover:bg-gray-300 '}
	py-2
	flex
	rounded
	items-center
	cursor-pointer"
	on:click|stopPropagation={() => {
		goto(getUrl());
	}}
>
	<div class="text">{brand.name}</div>
</a>
