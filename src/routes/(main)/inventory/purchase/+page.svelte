<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import Th from '$lib/components/Th.svelte';
	import {
		getInventoryOrders,
		inventoryPurchases
	} from '../../../../stores/inventory.js';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import { dateToIsoDateString } from '$lib/utils/dateToIsoDateString';
	import formatMoney from '../../../../utils/format_money';
	import Button from '$lib/components/Button.svelte';
	import ErrorButton from '$lib/components/ErrorButton.svelte';
	import PurchaseStateNav from '$lib/components/inventory/purchase/PurchaseStateNav.svelte';
	import { goto } from '$app/navigation';
	import Pagination from '$lib/components/Pagination.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { getColor } from '$lib/utils/getColor.js';

	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let orders = [];
	let totalCount = 0;

	$: {
		getInventoryOrders(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('dateFrom'),
			$page.url.searchParams.get('dateTo'),
			$page.url.searchParams.get('state')
		).then((result) => {
			orders = result.orders;
			totalCount = result.totalCount;
		});
	}
</script>

<nav class="flex flex-col">
	<PurchaseStateNav />
	<div class="flex justify-between mt-5">
		<div class="flex items-center">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-3xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />
		</div>
		<div>
			<!--			<ErrorButton>삭제</ErrorButton>-->
		</div>
	</div>
</nav>
<LoadingIndicator>
	<main class="mt-5 border rounded">
		<table class="w-full">
			<thead>
				<tr>
					<Th>발주번호</Th>
					<Th>거래처명</Th>
					<Th>상품</Th>
					<Th>총 발주금액</Th>
					<Th>상태</Th>
					<Th>입고예정일자</Th>
					<Th>발주서</Th>
					<Th>입고</Th>
					<Th>발주일자</Th>
				</tr>
			</thead>
			<tbody>
				{#each orders as order}
					<Tr>
						<Td>
							{order.inventoryOrderNumber}
						</Td>
						<Td>
							{order.supplier.name}
						</Td>
						<Td>
							{order.productNames}
						</Td>
						<Td>
							{formatMoney(order.priceTotal)}
						</Td>
						<Td>
							<div
								class="border rounded p-1 {getColor(
									order.state
								)}"
							>
								{order.state}
							</div>
						</Td>
						<Td>
							{order.dateScheduledReceiving
								? new Date(
										order.dateScheduledReceiving
								  ).toLocaleDateString()
								: '-'}
						</Td>
						<Td>
							<Button
								classes="p-2"
								onClick={() => {
									goto(
										`purchase/form/${order.id}`
									);
								}}>발주서</Button
							>
						</Td>
						<Td>
							<Button
								classes="p-2"
								disabled={order.state !==
									'발주진행중'}
								onClick={() => {
									goto(
										'purchase/receive/' + order.id
									);
								}}>입고</Button
							>
						</Td>
						<Td>
							{new Date(
								order.dateCreated
							).toLocaleDateString()}
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>

	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>
