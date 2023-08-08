<script>
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Th from '../../Th.svelte';
	import { checkedOrderMasters } from '../../../../stores/order.js';
	import CancelOrderTableRow from './CancelOrderTableRow.svelte';

	export let orders;
</script>

<table class="w-full overflow-x-scroll">
	<thead>
		<tr
			class="cursor-default bg-primary text-white "
		>
			<Th>주문번호</Th>
			<Th>도장</Th>
			<Th>지사</Th>
			<Th>주문금액</Th>
			<Th>작업용역비</Th>
			<Th>배송비</Th>
			<Th>주문상태</Th>
			<Th>취소요청날짜</Th>
			<Th
				><CheckBox
					group="cancel"
					parent
					onChange={(checked) => {
						checkedOrderMasters.set([]);
						if (checked) {
							checkedOrderMasters.set(orders);
						}
					}}
				/></Th
			>
		</tr>
	</thead>
	<tbody>
		{#each orders as order}
			<CancelOrderTableRow {order} />
		{/each}
	</tbody>
</table>
