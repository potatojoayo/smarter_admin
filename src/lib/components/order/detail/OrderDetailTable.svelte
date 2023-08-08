<script>
	import Th from '../../Th.svelte';
	import Tr from '../../Tr.svelte';
	import Td from '../../Td.svelte';
	import formatMoney from '../../../utils/formatMoney';
	import Button from '../../Button.svelte';
	import { openDeliveryDialog } from '../../../../stores/order.js';
	import { getColor } from '../../../utils/getColor.js';

	export let states = [];
	export let order;
</script>

<table class="w-full">
	<thead>
		<tr>
			<Th>상품이미지</Th>
			<Th>주문상품명</Th>
			<Th>색상</Th>
			<Th>사이즈</Th>
			<Th>주문상태</Th>
			<Th>재고수량</Th>
			<Th>개당단가</Th>
			<Th>수량</Th>
			<Th>상품금액</Th>
			<Th>작업비</Th>
			<Th>주문금액</Th>
			<Th>작업용역비</Th>
		</tr>
	</thead>
	<tbody>
		{#each order.details as detail, index}
			<Tr>
				<Td classes="flex justify-center">
					<img
						src={detail.product.productMaster
							.thumbnail}
						alt="image"
						class="w-20"
					/>
				</Td>
				<Td>
					{detail.product.name}
				</Td>
				<Td>
					{detail.product.color}
				</Td>
				<Td>
					{detail.product.size}
				</Td>
				<Td classes="!p-0">
					<div
						class="p-2 rounded border cursor-pointer {getColor(
							detail.state
						)}"
						on:click={() => {
							if (detail.state === '배송중') {
								openDeliveryDialog(detail);
							}
						}}
					>
						{#if detail.state.indexOf('작업') >= 0 && detail.recentWork}
							{`${detail.state} (${detail.recentWork.subcontractor.name})`}
						{:else}
							{detail.state}
						{/if}
					</div>
				</Td>
				<Td>
					{detail.product.inventoryQuantity}
				</Td>
				<Td>
					{formatMoney({
						money:
							detail.priceTotal / detail.quantity
					})}
				</Td>
				<Td>
					{detail.quantity}
				</Td>
				<Td>
					{formatMoney({
						money: detail.priceProducts
					})}
				</Td>
				<Td>
					{formatMoney({
						money: detail.priceWork
					})}
				</Td>
				<Td>
					{formatMoney({
						money: detail.priceTotal
					})}
				</Td>
				<Td>
					{formatMoney({
						money: detail.priceWorkLabor
					})}
				</Td>
			</Tr>
		{/each}
		<Tr classes="border-t-2">
			<Td colspan="7" classes="!py-5 text-lg"
				>합계</Td
			>
			<Td>
				{order.details.reduce(
					(a, b) => a + b.quantity,
					0
				)}
			</Td>
			<Td>
				{formatMoney({
					money: order.details.reduce(
						(a, b) => a + b.priceProducts,
						0
					)
				})}
			</Td>
			<Td>
				{formatMoney({
					money: order.details.reduce(
						(a, b) => a + b.priceWork,
						0
					)
				})}
			</Td>
			<Td>
				{formatMoney({
					money: order.details.reduce(
						(a, b) => a + b.priceTotal,
						0
					)
				})}
			</Td>
			<Td>
				{formatMoney({
					money: order.details.reduce(
						(a, b) => a + b.priceWorkLabor,
						0
					)
				})}
			</Td>
		</Tr>
	</tbody>
</table>
