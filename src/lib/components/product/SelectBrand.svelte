<script>
	import { goto } from '$app/navigation';
	import { getBrands } from '../../../stores/product.js';
	import { onMount } from 'svelte';

	let brands = [];

	let selectedBrand;

	export let productMaster;

	onMount(async () => {
		brands = await getBrands();
		if (productMaster.brand) {
			selectedBrand = brands.find(
				(c) => c.name === productMaster.brand.name
			);
		}
	});
</script>

<div class="flex flex-col mt-3">
	<div class="text-lg mb-3 flex justify-between">
		<div class="flex">
			<span class="cursor-default mr-2"
				>브랜드 선택</span
			>
			<span class="text-red-500">*</span>
		</div>
		<i
			class="fa fa-gear cursor-pointer"
			on:click={() => goto('/product/brand')}
		/>
	</div>
	<div class="flex bg-white">
		<div
			class="border w-fit rounded  w-48 h-60 overflow-y-scroll"
		>
			{#each brands as brand}
				<div
					class="py-2 cursor-pointer  px-5
						{productMaster.brand &&
					productMaster.brand.name === brand.name
						? 'bg-primary text-white'
						: 'hover:bg-gray-300'}
"
					on:click={() => {
						productMaster.brand = brand;
						for (let product of productMaster.products) {
							product.brand = brand;
						}
						productMaster = productMaster;
					}}
				>
					<span>
						{brand.name}
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>
