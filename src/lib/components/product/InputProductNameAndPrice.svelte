<script>
	import formatMoney from '../../utils/formatMoney';
	import InputText from '../InputText.svelte';

	export let productMaster;

	let inputConsumer = formatMoney({
		money: productMaster.priceConsumer,
		suffix: false
	});
	let inputParent = formatMoney({
		money: productMaster.priceParent,
		suffix: false
	});
	let inputGym = formatMoney({
		money: productMaster.priceGym,
		suffix: false
	});
	let inputVendor = formatMoney({
		money: productMaster.priceVendor,
		suffix: false
	});

	function updateProductsName(e) {
		productMaster.name = e.target.value;
		for (let product of productMaster.products) {
			product.name = productMaster.name;
		}
	}

	function updateProductsNumber(e) {
		productMaster.productNumber = e.target.value;
		for (let product of productMaster.products) {
			let split = product.modelNumber.split('_');
			product.modelNumber =
				productMaster.productNumber +
				'_' +
				split[1] +
				'_' +
				split[2];
		}
	}
</script>

<div
	class="flex flex-col mt-5 border p-5 rounded bg-white"
>
	<div class="flex flex-wrap">
		<div class="flex flex-col">
			<div
				class="text-lg mb-3 flex justify-between"
			>
				<div class="flex">
					<span class="cursor-default mr-2"
						>상품번호</span
					>
					<span class="text-red-500">*</span>
				</div>
			</div>
			<InputText
				onInput={updateProductsNumber}
				placeholder="상품번호 입력해 주세요"
				classes="w-60"
				value={productMaster.productNumber}
			/>
		</div>
		<div class="flex flex-col ml-10">
			<div
				class="text-lg mb-3 flex justify-between"
			>
				<div class="flex">
					<span class="cursor-default mr-2"
						>제품명</span
					>
					<span class="text-red-500">*</span>
				</div>
			</div>
			<InputText
				onInput={updateProductsName}
				placeholder="제품명을 입력해 주세요"
				classes="w-96"
				value={productMaster.name}
			/>
		</div>
		<div class="flex flex-col items-start ml-20">
			<div class="flex items-end">
				<span class="text-lg">도안필수상품</span>
				<span class="text-sm text-gray-500 ml-3"
					>체크 시 도안이 없을 경우 상품 주문이
					불가능합니다.</span
				>
			</div>
			<div class="flex items-end">
				<input
					bind:checked={productMaster.needDraft}
					type="checkbox"
					class="mt-5 w-6 h-6 ml-10 text-primary focus:ring-transparent rounded "
				/>
			</div>
		</div>
	</div>
	<div
		class="text-lg mb-3 flex justify-between mt-10"
	>
		<div class="flex">
			<span class="cursor-default mr-2">가격</span
			>
			<span class="text-red-500">*</span>
		</div>
	</div>
	<div class="columns-4">
		<div class="flex flex-col ">
			<span>소비자가</span>
			<div class="flex items-center mt-2">
				<InputText
					classes="w-28 text-right mr-1"
					placeholder="0"
					bind:value={inputConsumer}
					onInput={(e) => {
						productMaster.priceConsumer =
							e.target.value.replace(/\D/g, '');
						inputConsumer = formatMoney({
							money: productMaster.priceConsumer,
							suffix: false
						});
					}}
				/>
				원
			</div>
		</div>
		<div class="flex flex-col ">
			<span>학부모 공급가</span>
			<div class="flex items-center  mt-2 ">
				<InputText
					classes="w-28 text-right mr-1"
					placeholder="0"
					bind:value={inputParent}
					onInput={(e) => {
						productMaster.priceParent =
							e.target.value.replace(/\D/g, '');
						inputParent = formatMoney({
							money: productMaster.priceParent,
							suffix: false
						});
					}}
				/>
				원
			</div>
		</div>
		<div class="flex flex-col ">
			<span>체육관 공급가</span>
			<div class="flex items-center mt-2">
				<InputText
					classes="border w-28 text-right mr-1 p-2"
					placeholder="0"
					bind:value={inputGym}
					onInput={(e) => {
						productMaster.priceGym =
							e.target.value.replace(/\D/g, '');
						inputGym = formatMoney({
							money: productMaster.priceGym,
							suffix: false
						});
					}}
				/>
				원
			</div>
		</div>
		<div class="flex flex-col ">
			<span>이리스 원가</span>
			<div class="flex items-center mt-2">
				<InputText
					classes="border w-28 text-right mr-1 p-2"
					placeholder="0"
					bind:value={inputVendor}
					onInput={(e) => {
						productMaster.priceVendor =
							e.target.value.replace(/\D/g, '');
						inputVendor = formatMoney({
							money: productMaster.priceVendor,
							suffix: false
						});
					}}
				/>
				원
			</div>
		</div>
	</div>
</div>
