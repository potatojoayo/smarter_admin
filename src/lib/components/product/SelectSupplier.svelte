<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getSuppliers } from '../../../stores/inventory.js';

	let suppliers = [];

	onMount(async () => {
		suppliers = await getSuppliers();
	});

	export let productMaster;
</script>

<div class="flex flex-col mt-3">
	<div class="text-lg mb-3 flex justify-between">
		<div class="flex">
			<span class="cursor-default mr-2"
				>대표 거래처 선택</span
			>
			<span class="text-red-500">*</span>
		</div>
		<i
			class="fa fa-gear cursor-pointer"
			on:click={() => goto('/inventory/supplier')}
		/>
	</div>
	<div class="flex bg-white">
		<div
			class="border w-fit rounded  w-48 h-60 overflow-y-scroll"
		>
			{#each suppliers as supplier}
				<div
					class="py-2 cursor-pointer  px-5
						{productMaster.supplier &&
					productMaster.supplier.name ===
						supplier.name
						? 'bg-primary text-white'
						: 'hover:bg-gray-300'}
"
					on:click={() => {
						productMaster.supplier = supplier;
					}}
				>
					<span>
						{supplier.name}
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>
