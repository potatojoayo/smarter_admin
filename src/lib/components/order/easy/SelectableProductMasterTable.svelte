<script>
	import Tr from '../../Tr.svelte';
	import Td from '../../Td.svelte';
	import Th from '../../Th.svelte';

	export let products;
	export let selected = null;
	export let onClick;
</script>

<table
	class="table-auto border-collapse w-full parent w-full"
>
	<thead class="">
		<tr>
			<Th>상품번호</Th>
			<Th>브랜드</Th>
			<Th>카테고리</Th>
			<Th>제품명</Th>
		</tr>
	</thead>
	<tbody>
		{#each products as product}
			<Tr
				classes="cursor-pointer {selected &&
				selected.id === product.id
					? '!bg-primary !text-white hover:!bg-primary'
					: ''}"
				onClick={() => {
					selected = product;
					onClick();
				}}
			>
				<Td>{product.productNumber}</Td>
				<Td>{product.brand}</Td>
				<Td>{product.category}</Td>
				<Td>{product.name}</Td>
			</Tr>
		{/each}
	</tbody>
</table>
