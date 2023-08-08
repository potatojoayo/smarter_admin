<script>
	import CheckBox from '$lib/components/CheckBox.svelte';
	import OrderTableRow from './OrderTableRow.svelte';
	import Th from '../Th.svelte';
	import { page } from '$app/stores';
	import { checkedOrderMasters } from '../../../stores/order.js';

	export let orders;
	let needCheckBox;
	$: {
		let state =
			$page.url.searchParams.get('state');
		switch (state) {
			case '':
			case '무통장입금':
			case '간편주문':
			case '취소':
			case '결제완료':
				needCheckBox = true;
				break;
			case '작업완료':
			case '출고준비':
			case '작업중':
			case '전체':
			case '배송중':
			case '배송완료':
			case '추후배송':
				needCheckBox = false;
				break;
			default:
				needCheckBox = false;
		}
		if (
			$page.url.pathname.includes('/delivery') &&
			state === '전체'
		) {
			needCheckBox = true;
		}
	}
</script>

<table
	class="w-full overflow-x-scroll bg-white mt-8 border "
>
	<thead>
		<tr class="cursor-default">
			<Th classes="w-16 font-normal">주문번호</Th>
			<Th classes="w-40">도장</Th>
			<Th>주문금액</Th>
			<Th>배송비</Th>
			<Th>스마터머니</Th>
			<Th>쿠폰</Th>
			<Th>결제할금액</Th>
			<Th classes="w-28">주문상태</Th>
			<Th classes="w-40">주문일자</Th>
			<Th>관리자 메모</Th>
			<Th classes="w-16">방문수령</Th>
			<Th classes="w-16">요구사항</Th>
			{#if needCheckBox}
				<Th
					><CheckBox
						group="orders"
						parent
						onChange={(checked) => {
							if (checked) {
								checkedOrderMasters.set(orders);
							} else {
								checkedOrderMasters.set([]);
							}
						}}
					/></Th
				>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each orders as order (order.id)}
			<OrderTableRow {order} />
		{/each}
	</tbody>
</table>
