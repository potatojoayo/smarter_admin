<script>
	import Th from '../Th.svelte';
	import Tr from '../Tr.svelte';
	import Td from '../Td.svelte';
	import formatMoney from '../../utils/formatMoney';
	import Button from '../Button.svelte';
	export let addedProducts;
</script>

<section class="my-10 bg-white">
	<table class="w-full">
		<thead>
			<tr>
				<Th>상품명</Th>
				<Th>카테고리</Th>
				<Th>브랜드</Th>
				<Th>색상</Th>
				<Th>사이즈</Th>
				<Th>개수</Th>
				<Th>이름</Th>
				<Th>상품금액 합계</Th>
				<Th>입고예정일</Th>
				<Th>직송</Th>
				<Th />
			</tr>
		</thead>
		<tbody>
			{#each addedProducts as item}
				<Tr>
					<!-- 상품명 -->
					<Td>
						{item.productMaster.name}
					</Td>
					<!-- 카테고리 -->
					<Td>
						{item.productMaster.category.name}
					</Td>
					<!-- 브랜드 -->
					<Td>
						{item.productMaster.brand.name}
					</Td>
					<!-- 색상 -->
					<Td>
						{item.product.color}
					</Td>
					<!-- 사이즈 -->
					<Td>
						{item.product.size}
					</Td>
					<!-- 개수 -->
					<Td>
						{item.count}
					</Td>
					<!-- 이름 -->
					<Td>
						{item.names ?? ''}
					</Td>
					<!-- 상품금액 합계 -->
					<Td>
						{formatMoney({
							money:
								(item.productMaster.priceGym +
									item.product.priceAdditional +
									(item.draft
										? item.draft.priceWork
										: 0)) *
								item.count
						})}
					</Td>
					<Td>
						{item.product.dateToBeShipped ?? '-'}
					</Td>
					<Td>
						{item.product.isDirectDelivery
							? 'O'
							: 'X'}
					</Td>
					<!-- 삭제 -->
					<Td>
						<button
							class="text-red-500 hover:text-red-700"
							on:click={() => {
								addedProducts =
									addedProducts.filter(
										(p) => p.id !== item.id
									);
							}}>삭제</button
						>
					</Td>
				</Tr>
			{/each}
		</tbody>
	</table>
</section>
