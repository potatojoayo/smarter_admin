<script>
	import Tr from '../../Tr.svelte';
	import Td from '../../Td.svelte';
	import formatMoney from '../../../utils/formatMoney';
	export let orderDetails = [];
	export let order;
</script>

<div class="border ">
	<table class="w-full">
		<thead>
			<tr class="bg-blue-200 h-10 text-blue-900">
				<th>주문상품</th>
				<th>색상</th>
				<th>사이즈</th>
				<th>수량</th>
				<th>주문상태</th>
				<th>금액 합계</th>
				<th>총 작업용역비</th>
			</tr>
		</thead>

		<tbody>
			{#each orderDetails as detail}
				<Tr classes="cursor-default">
					<Td>
						{detail.product.name}
					</Td>
					<Td>
						{detail.product.color}
					</Td>
					<Td>
						{detail.product.size}
					</Td>
					<Td>
						{detail.quantity}
					</Td>
					<Td classes="!p-0">
						{detail.state}
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
		</tbody>
	</table>
</div>
