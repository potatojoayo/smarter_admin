<script>
	import Dialog from '../Dialog.svelte';
	import {
		changeInventoryQuantity,
		closeChangeInventoryDialog,
		isChangeInventoryDialogOpen,
		selectedProduct
	} from '../../../stores/inventory.js';
	import Button from '../Button.svelte';
	import ErrorButton from '../ErrorButton.svelte';
	import InputNumber from '../InputNumber.svelte';

	let quantity;
	let reason;

	async function save() {
		if (confirm('재고수량을 변경하시겠습니까?')) {
			const success =
				await changeInventoryQuantity(
					$selectedProduct.productId,
					quantity,
					reason
				);
			if (success) {
				alert('재고수량이 변경되었습니다.');
				closeChangeInventoryDialog();
				location.reload();
			}
		} else {
			alert('실패');
		}
	}
</script>

<Dialog
	open={$isChangeInventoryDialogOpen}
	classes="min-w-[300px]"
>
	<div class="text-lg">재고변경</div>

	<div class="flex mt-5">
		<div class="mr-10">
			<div class="text-sm">상품명</div>
			<div>
				{$selectedProduct.name}
			</div>
		</div>

		<div class="mr-10">
			<div class="text-sm">색상</div>
			<div>
				{$selectedProduct.color}
			</div>
		</div>
		<div class="mr-10">
			<div class="text-sm">사이즈</div>
			<div>
				{$selectedProduct.size}
			</div>
		</div>
		<div class="mr-10">
			<div class="text-sm">판매상태</div>
			<div>
				{$selectedProduct.state}
			</div>
		</div>
	</div>

	<div class="mt-5 flex">
		<div class="mr-10">
			<div class="text-sm">재고수량</div>
			<div>
				{$selectedProduct.inventoryQuantity}
			</div>
		</div>

		<div class="mr-10">
			<div class="text-sm">입고예정수량</div>
			<div>
				{$selectedProduct.expectedInventoryQuantity}
			</div>
		</div>
		<div class="mr-10">
			<div class="text-sm">임계재고수량</div>
			<div>
				{$selectedProduct.thresholdInventoryQuantity}
			</div>
		</div>
		<div class="mr-10">
			<div class="text-sm">목표재고수량</div>
			<div>
				{$selectedProduct.goalInventoryQuantity}
			</div>
		</div>
	</div>

	<div class="mt-5 flex flex-col">
		<span class="mb-3 text-sm">재고변경수량</span>
		<InputNumber
			placeholder="0"
			bind:value={quantity}
			classes="text-right w-20 "
		/>
	</div>
	<div class="mt-5 flex flex-col">
		<span class="mb-3 text-sm">재고변경사유</span>
		<textarea
			rows="3"
			class="rounded focus:border-primary resize-none"
			bind:value={reason}
		/>
	</div>
	<div class="flex justify-end mt-5">
		<ErrorButton
			onClick={closeChangeInventoryDialog}
			>취소</ErrorButton
		>
		<div class="mx-1" />
		<Button onClick={save}>저장</Button>
	</div>
</Dialog>
