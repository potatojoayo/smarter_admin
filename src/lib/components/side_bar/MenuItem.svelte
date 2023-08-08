<script>
	import { goto } from '$app/navigation';
	import {
		productPage,
		category,
		subCategory,
		brand
	} from '../../../stores/product.js';
	import { todayEasyOrderCountByState } from '../../../stores/order.js';
	import { page } from '$app/stores';

	export let menuItem;
	let open = false;
	let easyOrderCount = 0;
	let title = menuItem.parent.title;
	function toggle() {
		open = !open;
	}
	// async function updateCount() {
	// 	easyOrderCount =
	// 		await todayEasyOrderCountByState(
	// 			'주문요청'
	// 		);
	// }
	// $: if ($page) {
	// 	if (title === '간편주문') {
	// 		updateCount();
	// 	}
	// }
</script>

<div class="flex flex-col">
	<a
		href={menuItem.parent.path
			? menuItem.parent.path
			: '/'}
		on:click|preventDefault={menuItem.parent.path
			? goto(menuItem.parent.path)
			: toggle}
	>
		<div
			class="group hover:bg-primary hover:text-white p-3 flex items-center justify-between rounded"
		>
			<div class="flex items-center">
				<i
					class="mr-3 w-5 {menuItem.parent.icon}"
				/>
				{menuItem.parent.title}
				<!-- {#if easyOrderCount}
					<div
						class="ml-2 text-red-500 text-sm group-hover:text-white"
					>
						({easyOrderCount})
					</div>
				{/if} -->
			</div>
			{#if menuItem.children.length > 0}
				<i
					class="fa fa-chevron-up text-md group-hover:text-white
				transition-transform duration-500 text-gray-500
					{open ? 'rotate-180 text-gray-900' : ''}"
				/>
			{/if}
		</div>
	</a>
	<div
		class="{open
			? 'max-h-60'
			: 'max-h-0'} overflow-hidden transition-all duration-500 "
	>
		{#each menuItem.children as child}
			<a
				href="/"
				on:click|preventDefault={() => {
					goto(child.path);
					if (child.path.includes('/product')) {
						$productPage = 1;
						$category = null;
						$subCategory = null;
						$brand = null;
					}
				}}
			>
				<div
					class="text-md hover:bg-primary p-2 pl-4 rounded text-gray-400 hover:text-white "
				>
					{child.title}
				</div>
			</a>
		{/each}
	</div>
</div>
