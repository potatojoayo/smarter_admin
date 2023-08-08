<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import Th from '$lib/components/Th.svelte';
	import { getInventoryReceives } from '../../../../stores/inventory.js';
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import formatMoney from '../../../../utils/format_money';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import ReceiveStateNav from '$lib/components/inventory/receive/ReceiveStateNav.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { getColor } from '$lib/utils/getColor.js';

	$: state = $page.url.searchParams.get('state');
	$: dateFrom =
		$page.url.searchParams.get('dateFrom');
	$: dateTo =
		$page.url.searchParams.get('dateTo');

	let receives = [];
	let totalCount = 0;

	$: {
		getInventoryReceives(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('dateFrom'),
			$page.url.searchParams.get('dateTo'),
			$page.url.searchParams.get('state'),
			$page.url.searchParams.get('search')
		).then((result) => {
			receives = result.receives;
			totalCount = result.totalCount;
		});
	}
</script>

<nav class="flex flex-col">
	<ReceiveStateNav />
	<div class="flex justify-between mt-5">
		<div class="flex items-center">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-3xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />
		</div>
	</div>
</nav>

<LoadingIndicator>
	<main class="mt-5 border rounded">
		<table class="w-full">
			<thead>
				<tr>
					<Th>입고일자</Th>
					<Th>입고번호</Th>
					<Th>발주상태</Th>
					<Th>거래처명</Th>
					<Th>상품</Th>
					<Th>입고수량</Th>
					<Th>미입고수량</Th>
					<Th>총 입고금액</Th>
				</tr>
			</thead>
			<tbody>
				{#each receives as receive}
					<Tr>
						<Td>
							{new Date(
								receive.dateCreated
							).toLocaleDateString()}
						</Td>
						<Td>
							<Button
								onClick={() => {
									goto(
										'receive/detail/' + receive.id
									);
								}}
							>
								{receive.receiveNumber}
							</Button>
						</Td>
						<Td>
							<div
								class="p-1 border rounded {getColor(
									receive.state
								)}"
							>
								{receive.state}
							</div>
						</Td>
						<Td>
							{receive.inventoryOrderMaster
								.supplier.name}
						</Td>
						<Td>
							{receive.inventoryOrderMaster
								.productNames}
						</Td>
						<Td>
							{receive.quantityTotalReceived}
						</Td>
						<Td>
							{receive.quantityTotalNotReceived}
						</Td>
						<Td>
							{formatMoney(
								receive.priceTotalReceived
							)}
						</Td>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>
	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>
