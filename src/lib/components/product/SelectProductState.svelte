<script>
	export let productMaster;
	function onChange(e) {
		productMaster.state = e.currentTarget.value;
		for (let product of productMaster.products) {
			product.state = e.currentTarget.value;
		}
	}
</script>

<div class="flex flex-col mt-10">
	<span class="text-lg">판매상태</span>
	<div class="flex mt-3 items-center">
		<input
			type="radio"
			name="state"
			class="mr-2"
			value="숨김"
			id="inactive"
			on:change={onChange}
			checked={productMaster.state === '숨김'}
		/>
		<label for="inactive"> 숨김 </label>

		<div class="mx-2" />
		<input
			type="radio"
			name="state"
			class="mr-2"
			value="판매중"
			id="active"
			on:change={onChange}
			checked={productMaster.state === '판매중'}
		/>
		<label for="active"> 판매중 </label>
		<div class="mx-2" />
		<input
			type="radio"
			name="state"
			class="mr-2"
			value="품절"
			id="soldout"
			on:change={onChange}
			checked={productMaster.state === '품절'}
		/>
		<label for="soldout"> 품절 </label>
	</div>
</div>
