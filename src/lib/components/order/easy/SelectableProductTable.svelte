<script>
	import Tr from '../../Tr.svelte';
	import Td from '../../Td.svelte';
	import Th from '../../Th.svelte';
	import formatMoney from '../../../utils/formatMoney';

	export let products;

	export let selected;
</script>

<table
	class="table-auto border-collapse w-full parent w-full"
>
	<thead class="">
		<tr>
			<Th>브랜드</Th>
			<Th>카테고리</Th>
			<Th>상품명</Th>
			<Th>색상</Th>
			<Th>사이즈</Th>
			<Th>단가</Th>
			<Th>재고수량</Th>
		</tr>
	</thead>
	<tbody>
		{#each products as product}
			<Tr
				classes="cursor-pointer {selected ===
				product.productId
					? '!bg-primary !text-white hover:!bg-primary'
					: ''}"
				onClick={() => {
					selected = product.productId;
				}}
			>
				<Td classes="h-14"
					>{product.productMaster.brand.name}</Td
				>
				<Td whitespaceNoWrap
					>{product.productMaster.category
						.name}</Td
				>
				<Td whitespaceNoWrap>{product.name}</Td>
				<Td>{product.color}</Td>
				<Td>{product.size}</Td>
				<Td
					>{formatMoney({
						money: product.productMaster.priceGym
					})}</Td
				>
				<Td>{product.inventoryQuantity}</Td>
			</Tr>
		{/each}
	</tbody>
</table>
