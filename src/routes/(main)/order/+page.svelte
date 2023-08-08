<script>
	import InputDate from '$lib/components/InputDateSearchParam.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { page } from '$app/stores';
	import OrderListTable from '$lib/components/order/OrderListTable.svelte';
	import {
		getOrderMasters,
		isDraftDialogOpen,
		isStartShippingDialogOpen
	} from '../../../stores/order.js';
	import DialogDraft from '$lib/components/order/DialogDraft.svelte';
	import DialogStartShipping from '$lib/components/order/DialogStartShipping.svelte';
	import OrderListAction from '$lib/components/order/OrderListAction.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import StateNav from '$lib/components/StateNav.svelte';

	export let data;

	let states = [
			'전체',
			'간편주문',
			'무통장입금',
			'결제완료',
			'전처리작업중',
			'후작업중',
			'후작업완료',
			'추후배송',
			'출고준비',
			'묶음배송',
			'배송중',
			'배송완료',
			'방문수령',
			'주문취소',
			'부분취소'
		],
		user = data.me;

	$: state = $page.url.searchParams.get('state');
	$: dateTo =
		$page.url.searchParams.get('dateTo');
	$: user = data.me;

	let orders = [];
	let totalCount = 0;

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
	<StateNav {states} />
	<div class="fle flex-col mt-4 justify-between ">
		<div class="flex items-center ">
			<InputDate param="dateFrom" max={dateTo} />
			<span class="mx-3 text-2xl"> ~ </span>
			<InputDate param="dateTo" />
			<SearchBar classes="ml-5" />

			{#if user && user.group !== '체육사'}
				<div class="flex justify-end ml-auto">
					<OrderListAction {state} />
				</div>
			{/if}
		</div>
	</div>
</nav>

<main class="rounded ">
	<OrderListTable {orders} />
</main>

{#if $isDraftDialogOpen}
	<DialogDraft />
{/if}

{#if $isStartShippingDialogOpen}
	<DialogStartShipping />
{/if}

<Pagination {totalCount} classes="mt-8" />
