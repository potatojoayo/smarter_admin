<script>
	import Tr from '../Tr.svelte';
	import Td from '../Td.svelte';
	import Button from '../Button.svelte';
	import { dateToIsoDateString } from '../../utils/dateToIsoDateString';
	import CheckBox from '../CheckBox.svelte';
	import { goto } from '$app/navigation';
	import {
		openChangeInventoryDialog,
		selectedProduct
	} from '../../../stores/inventory.js';
	import { checkedProducts } from '../../../stores/product.js';
	import { getColor } from '../../utils/getColor.js';

	export let product;

	let isUnderThreshold;
	$: isUnderThreshold =
		product.inventoryQuantity +
			product.expectedInventoryQuantity <
		product.thresholdInventoryQuantity;
</script>

<Tr>
	<Td>
		<Button
			classes={isUnderThreshold
				? 'hover:bg-error hover:border-error hover:text-red-800'
				: ''}
			onClick={() => {
				goto(
					`/product/${product.productMaster.id}`
				);
			}}
		>
			{product.productMaster.productNumber}
		</Button>
	</Td>
	<!--	<Td-->
	<!--		>{`${product.productMaster.category.name} > ${product.productMaster.subCategory.name}`}</Td-->
	<!--	>-->
	<!--	<Td>{product.productMaster.brand.name}</Td>-->
	<Td>{product.name}</Td>
	<Td
		><div
			class="border p-1 rounded {getColor(
				product.state
			)}"
		>
			{product.state}
		</div></Td
	>
	<Td>{product.color}</Td>
	<Td>{product.size}</Td>
	<Td>
		<Button
			classes="{isUnderThreshold
				? 'hover:bg-error hover:border-error bg-error border-error text-red-800'
				: 'bg-primary border-primary text-white'} w-20 p-1"
			onClick={() => {
				selectedProduct.set(product);
				openChangeInventoryDialog(product);
			}}
		>
			{product.inventoryQuantity}
		</Button>
	</Td>
	<Td>{product.expectedInventoryQuantity}</Td>
	<Td>{product.thresholdInventoryQuantity}</Td>
	<Td>{product.goalInventoryQuantity}</Td>
	<Td
		>{dateToIsoDateString(
			product.dateCreated
		)}</Td
	>
	<Td
		><CheckBox
			group="inventory"
			onChange={(checked) => {
				if (checked) {
					$checkedProducts.push(
						product.productId
					);
				} else {
					$checkedProducts =
						$checkedProducts.filter(
							(p) => p !== product.productId
						);
				}
			}}
			classes={isUnderThreshold
				? 'text-error'
				: ''}
		/></Td
	>
</Tr>
