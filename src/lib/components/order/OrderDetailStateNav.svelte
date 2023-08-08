<script>
	import OrderDetailStateNavItem from './OrderDetailStateNavItem.svelte';

	let orderDetailStates = [
		'전체',
		'간편주문',
		'무통장입금',
		'결제완료',
		'전처리작업중',
		'전처리작업완료',
		'후작업중',
		'후작업완료',
		'추후배송',
		'출고준비',
		'배송중',
		'배송완료'
	];
</script>

<div class="flex">
	{#each orderDetailStates as state}
		<OrderDetailStateNavItem {state} />
	{/each}
</div>
