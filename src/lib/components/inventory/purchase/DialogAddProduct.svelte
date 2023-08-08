<script>
	import Dialog from '../../Dialog.svelte';
	import SearchProduct from './SearchProduct.svelte';
	import {
		addInventoryOrderDetails,
		closeAddProductDialog,
		isAddProductDialogOpen
	} from '../../../../stores/inventory.js';
	import Button from '../../Button.svelte';
	import ErrorButton from '../../ErrorButton.svelte';
	export let orderId;
	let selected = [];
</script>

<Dialog open={$isAddProductDialogOpen}>
	<span class="text-lg">상품추가</span>
	<SearchProduct bind:selected />
	<div class="flex justify-end mt-5">
		<ErrorButton
			classes="w-20 p-3"
			onClick={() => {
				closeAddProductDialog();
			}}>취소</ErrorButton
		>
		<div class="mx-1" />
		<Button
			classes="w-20 p-3"
			onClick={async () => {
				if (selected.length === 0) {
					return alert(
						'추가하실 상품을 선택해주세요.'
					);
				}
				if (
					confirm(
						'선택하신 상품을 추가하시겠습니까?'
					)
				) {
					if (
						await addInventoryOrderDetails(
							orderId,
							selected
						)
					) {
						alert(
							'선택하신 상품이 추가되었습니다.'
						);
						closeAddProductDialog();
						return location.reload();
					}
				}
			}}>추가</Button
		>
	</div>
</Dialog>
