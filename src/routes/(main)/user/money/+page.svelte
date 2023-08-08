<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import {
		chargeSmarterMoney,
		getChargeOrders,
		bulkChargeSmarterMoney
	} from '../../../../stores/user';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { isLoading } from '../../../../stores/global_setting.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { dateToIsoDateString } from '$lib/utils/dateToIsoDateString';
	import Pagination from '$lib/components/Pagination.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { getColor } from '$lib/utils/getColor.js';
	import StateNav from '$lib/components/StateNav.svelte';
	import { formatPhone } from '$lib/utils/formatPhone';

	$isLoading = true;
	let totalCount = 0;

	let chargeOrders = [];

	onMount(() => {
		let state =
			$page.url.searchParams.get('state');
		let currentPage =
			$page.url.searchParams.get('page');
		loadChargeOrders(
			state === '전체' ? null : state,
			currentPage
		);
	});

	$: {
		let state =
			$page.url.searchParams.get('state');
		let currentPage =
			$page.url.searchParams.get('page');
		let keyword =
			$page.url.searchParams.get('keyword');
		loadChargeOrders(
			state === '전체' ? null : state,
			currentPage,
			keyword
		);
	}

	let states = ['전체', '무통장입금', '결제완료'];

	async function loadChargeOrders(
		state,
		page,
		keyword
	) {
		let result = await getChargeOrders(
			state,
			page,
			keyword
		);
		chargeOrders = result.chargeOrders;
		totalCount = result.totalCount;

		$isLoading = false;
	}

	let open = false;
</script>

<nav>
	<div class="flex items-center">
		<StateNav {states} />
	</div>
	<div
		class="flex justify-between items-center mt-5"
	>
		<SearchBar />
		<div class="flex items-center">
			<Button
				classes="h-fit w-20 p-3"
				onClick={() => {
					const checkedOrders =
						chargeOrders.filter((o) => o.checked);
					if (checkedOrders.length === 0) {
						return alert(
							'적어도 하나 이상의 요청을 선택해주세요'
						);
					}
					bulkChargeSmarterMoney(checkedOrders);
				}}
			>
				<span>결제확인</span>
			</Button>
		</div>
	</div>
</nav>

<main
	class="overflow-x-scroll relative mt-5 border rounded bg-white border"
>
	<table class="w-full">
		<thead>
			<tr>
				<Th>아이디</Th>
				<Th>체육관</Th>
				<Th>대표자</Th>
				<Th>휴대폰</Th>
				<Th>충전금액</Th>
				<Th>결제방법</Th>
				<Th>상태</Th>
				<Th>요청일</Th>
				<Th>수정일</Th>
				<Th
					><CheckBox
						group="money"
						parent
						onChange={(checked) => {
							chargeOrders.forEach((o) => {
								if (o.state === '무통장입금') {
									o.checked = checked;
								}
							});
						}}
					/></Th
				>
			</tr>
		</thead>
		<tbody>
			<LoadingIndicator>
				{#each chargeOrders as order}
					<Tr>
						<Td whitespaceNoWrap
							>{order.user.identification}</Td
						>
						<Td whitespaceNoWrap
							>{order.user.gym.name}</Td
						>
						<Td>{order.user.name}</Td>
						<Td whitespaceNoWrap
							>{formatPhone(order.user.phone)}</Td
						>
						<Td
							>{formatMoney({
								money: order.amount
							})}</Td
						>
						<Td>{order.method}</Td>
						<Td>
							<button
								class="border p-2 rounded {getColor(
									order.state
								)}"
								on:click={() => {
									if (
										order.state === '무통장입금'
									) {
										chargeSmarterMoney(
											order.orderId,
											order.user.userId
										);
									}
								}}
							>
								{order.state}
							</button>
						</Td>
						<Td whitespaceNoWrap
							>{dateToIsoDateString(
								order.dateCreated
							)}</Td
						>
						<Td whitespaceNoWrap
							>{dateToIsoDateString(
								order.dateUpdated
							)}</Td
						>
						<Td>
							<CheckBox
								group="money"
								onChange={(checked) => {
									order.checked = checked;
								}}
								disabled={order.state !==
									'무통장입금'}
							/>
						</Td>
					</Tr>
				{/each}
			</LoadingIndicator>
		</tbody>
	</table>
</main>
<Pagination {totalCount} classes="my-10" />
