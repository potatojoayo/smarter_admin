<script>
	import Tr from '../Tr.svelte';
	import Th from '../Th.svelte';
	import Td from '../Td.svelte';
	import InputNumber from '../InputNumber.svelte';
	import { dateToIsoDateString } from '../../utils/dateToIsoDateString';
	import ProductDetailStateDropdown from './ProductDetailStateDropdown.svelte';
	import { getColor } from '../../utils/getColor.js';

	export let productMaster;
</script>

<div class="flex flex-col mt-8 bg-white border">
	<table>
		<thead>
			<tr>
				<Th>모델번호</Th>
				<Th>상품명</Th>
				<Th>색상</Th>
				<Th>사이즈</Th>
				<Th>추가금액</Th>
				<Th>재고수량</Th>
				<Th>임계재고수량</Th>
				<Th>목표재고수량</Th>
				<Th>상태</Th>
				<Th>등록일</Th>
				<Th>수정일</Th>
			</tr>
		</thead>
		<tbody>
			{#each productMaster.products as product, index}
				<Tr>
					<Td>{product.modelNumber}</Td>
					<Td whitespaceNoWrap>{product.name}</Td>
					<Td>{product.color}</Td>
					<Td>{product.size}</Td>
					<Td>
						<InputNumber
							placeholder="0"
							classes="w-20 text-center"
							bind:value={product.priceAdditional}
						/>
					</Td>
					<Td>
						{product.inventoryQuantity}
					</Td>
					<Td
						>{product.thresholdInventoryQuantity ??
							'-'}</Td
					>
					<Td
						>{product.goalInventoryQuantity ??
							'-'}</Td
					>
					<Td>
						<ProductDetailStateDropdown
							classes={getColor(product.state)}
							bind:value={product.state}
						/>
					</Td>
					<Td
						>{dateToIsoDateString(
							product.dateCreated
						)}</Td
					>
					<Td
						>{dateToIsoDateString(
							product.dateUpdated
						)}</Td
					>
				</Tr>
			{/each}
		</tbody>
	</table>
</div>
