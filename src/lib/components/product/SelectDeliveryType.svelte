<script>
	export let productMaster;
	function onChange(e) {
		productMaster.deliveryType =
			e.currentTarget.value;
	}
</script>

<div class="flex flex-col">
	<span class="text-lg">상품 배송 설정</span>
	<div class="flex flex-col mt-3">
		<div class="flex">
			<input
				type="radio"
				name="type"
				class="mr-2"
				value="일반배송상품"
				id="default"
				on:change={onChange}
				checked={productMaster.deliveryType ===
					'일반배송상품'}
			/>
			<label for="default"> 일반배송상품 </label>
		</div>
		<div class="flex mt-2">
			<input
				type="radio"
				name="type"
				class="mr-2"
				value="개별배송상품"
				id="individual"
				on:change={onChange}
				checked={productMaster.deliveryType ===
					'개별배송상품'}
			/>
			<label for="individual">
				개별배송상품
			</label>
		</div>
		<div class="flex mt-2">
			<input
				type="radio"
				name="type"
				class="mr-2"
				value="분할배송상품"
				id="seperate"
				on:change={onChange}
				checked={productMaster.deliveryType ===
					'분할배송상품'}
			/>
			<label for="seperate"> 분할배송상품 </label>
		</div>
		{#if productMaster.deliveryType === '분할배송상품'}
			<div class="flex flex-col mt-3 text-sm">
				<div class="flex items-center">
					<span class="text-red-500 mr-1">*</span>
					<span>박스당 최대 개수</span>
				</div>
				<div class="flex mt-2">
					<input
						type="number"
						class="border-b text-right mr-1 max-w-[50px]"
						bind:value={productMaster.maxQuantityPerBox}
					/>
					개
				</div>
			</div>
		{/if}
	</div>
</div>
