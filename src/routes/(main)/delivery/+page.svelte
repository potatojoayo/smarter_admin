<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import OrderListTable from '$lib/components/order/OrderListTable.svelte';
	import {
		checkedOrderMasters,
		getOrderMasters,
		isDraftDialogOpen,
		isStartShippingDialogOpen,
		todayDeliveryOrderCountByState
	} from '../../../stores/order.js';
	import DialogDraft from '$lib/components/order/DialogDraft.svelte';
	import DialogStartShipping from '$lib/components/order/DialogStartShipping.svelte';
	import OrderListAction from '$lib/components/order/OrderListAction.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import StateNav from '$lib/components/StateNav.svelte';
	import Button from '$lib/components/Button.svelte';

	$: state = $page.url.searchParams.get('state');
	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let orders = [];
	let totalCount = 0;

	let states = [
		'전체',
		'출고준비',
		'묶음배송',
		'추후배송',
		'배송중',
		'배송완료'
	];

	$: {
		getOrderMasters(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('dateFrom'),
			$page.url.searchParams.get('dateTo'),
			$page.url.searchParams.get('state'),
			$page.url.searchParams.get('keyword')
		).then((result) => {
			orders = result.orders;
			totalCount = result.totalCount;
		});
	}
</script>

<nav class="flex flex-col">
	<StateNav
		{states}
		getCount={todayDeliveryOrderCountByState}
	/>
	<div class="flex mt-5 items-center">
		<InputDate param="dateFrom" max={dateTo} />
		<span class="mx-3 text-3xl"> ~ </span>
		<InputDate param="dateTo" />
		<SearchBar classes="ml-5" />
		<div class="ml-auto">
			<OrderListAction {state} />

			{#if state === '전체'}
				<Button
					classes="ml-2 p-3"
					onClick={() => {
						if (
							$checkedOrderMasters.length === 0
						) {
							return alert(
								'선택된 주문이 없습니다.'
							);
						}
						window.open(
							`${
								$page.url.origin
							}/print/order/${$checkedOrderMasters
								.map((c) => c.orderMasterId)
								.join(',')}`,
							'_blank',
							'height=800, width=1400'
						);
					}}
				>
					{'리스트 출력'}
				</Button>
			{/if}
		</div>
	</div>
</nav>

<LoadingIndicator>
	<OrderListTable {orders} />

	{#if $isDraftDialogOpen}
		<DialogDraft />
	{/if}

	{#if $isStartShippingDialogOpen}
		<DialogStartShipping />
	{/if}

	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>
