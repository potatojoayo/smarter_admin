<script>
	export let productMaster;
</script>

<div
	class="mt-5 flex flex-col border rounded py-5 pl-5 pr-10 items-start flex-1 min-w-[500px] min-h-[200px] bg-white"
>
	<span class="text-lg mr-2"> 재고 관리</span>
	<span class="text-xs text-gray-500"
		>상품의 재고수량이 임계재고수량 밑으로
		내려가면 알림이 생성됩니다.</span
	>
	<div
		class="flex items-center h-full flex-wrap justify-around w-full"
	>
		<div
			class="flex flex-col justify-center mr-5"
		>
			임계재고수량
			<div class="flex items-center mt-3">
				<input
					type="number"
					class="border rounded p-2 text-right mr-1 max-w-[90px] focus:border-primary"
					placeholder="0"
					value={productMaster.thresholdInventoryQuantity}
					on:input={(e) => {
						productMaster.thresholdInventoryQuantity =
							e.target.value;
						for (let product of productMaster.products) {
							product.thresholdInventoryQuantity =
								productMaster.thresholdInventoryQuantity;
						}
					}}
				/>
				개
			</div>
		</div>
		<div class="flex flex-col justify-center">
			목표재고수량
			<div class="flex items-end mt-3">
				<input
					type="number"
					class="border rounded p-2 text-right mr-1 max-w-[90px] focus:border-primary"
					placeholder="0"
					value={productMaster.goalInventoryQuantity}
					on:input={(e) => {
						productMaster.goalInventoryQuantity =
							e.target.value;
						for (let product of productMaster.products) {
							product.goalInventoryQuantity =
								productMaster.goalInventoryQuantity;
						}
					}}
				/>
				개
			</div>
		</div>
	</div>
</div>
