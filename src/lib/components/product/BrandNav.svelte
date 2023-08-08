<script>
	import BrandItem from './BrandItem.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getBrands } from '../../../stores/product.js';

	let brands = [];

	onMount(async () => {
		brands = await getBrands();
	});
</script>

<div
	class="cursor-default whitespace-nowrap px-5 py-2 min-w-[180px] flex justify-between"
>
	<span
		class="text-lg mr-1 pl-2 py-3 pr-14 whitespace-nowrap"
		>브랜드</span
	>
	<i
		class="fa fa-gear text-lg cursor-pointer"
		on:click={(e) => goto('product/brand')}
	/>
</div>
<div class="max-h-80 overflow-y-scroll p-3">
	<BrandItem brand={{ name: '전체' }} />
	{#each brands as brand}
		<BrandItem {brand} />
	{/each}
</div>

<div class="my-2" />
