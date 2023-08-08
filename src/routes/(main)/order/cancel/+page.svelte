<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import {
		changeState,
		checkedOrderMasters,
		getOrderMastersWithDetails,
		todayCancelOrderCountByState
	} from '../../../../stores/order.js';
	import Pagination from '$lib/components/Pagination.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import CancelOrderListTable from '$lib/components/order/cancel/CancelOrderListTable.svelte';
	import Button from '$lib/components/Button.svelte';
	import StateNav from '$lib/components/StateNav.svelte';

	$: state = $page.url.searchParams.get('state');
	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let orders = [];
	let totalCount = 0;

	$: {
		getOrderMastersWithDetails(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('dateFrom'),
			$page.url.searchParams.get('dateTo'),
			$page.url.searchParams.get('state') ===
				'전체'
				? ['취소요청', '취소완료']
				: $page.url.searchParams.get('state'),
			$page.url.searchParams.get('search')
		).then((result) => {
			orders = result.orders;
			totalCount = result.totalCount;
		});
	}
</script>

<nav class="flex flex-col">
	<StateNav
		states={['전체', '취소요청', '취소완료']}
		getCount={todayCancelOrderCountByState}
	/>
	<div class="flex mt-5 justify-between">
		<div class="flex items-center">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-3xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />
		</div>
		<div class="flex">
			<Button
				onClick={async () => {
					if ($checkedOrderMasters.length === 0) {
						return alert(
							'적어도 하나 이상의 주문을 선택해주세요.'
						);
					}
					let orderDetailNumbers = [];
					$checkedOrderMasters.forEach((m) => {
						m.details.forEach((d) => {
							orderDetailNumbers.push(
								d.orderDetailNumber
							);
						});
					});
					if (
						await changeState(
							orderDetailNumbers,
							'취소완료'
						)
					) {
						alert(
							'선택하신 주문의 취소가 완료되었습니다.'
						);
						location.reload();
					}
				}}>취소완료</Button
			>
		</div>
	</div>
</nav>

<LoadingIndicator>
	<main class="mt-3 border rounded">
		<CancelOrderListTable {orders} />
	</main>

	<Pagination {totalCount} classes="mt-5" />
</LoadingIndicator>
