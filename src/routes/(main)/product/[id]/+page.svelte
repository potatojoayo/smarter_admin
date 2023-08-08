<script>
	import SelectCategory from '$lib/components/product/SelectCategory.svelte';
	import SelectBrand from '$lib/components/product/SelectBrand.svelte';
	import SelectThumbnail from '$lib/components/product/SelectThumbnail.svelte';
	import SelectSupplier from '$lib/components/product/SelectSupplier.svelte';
	import InputProductNameAndPrice from '$lib/components/product/InputProductNameAndPrice.svelte';
	import SelectProductImages from '$lib/components/product/SelectProductImages.svelte';
	import SelectColor from '$lib/components/product/SelectColor.svelte';
	import SelectSize from '$lib/components/product/SelectSize.svelte';
	import SelectProductState from '$lib/components/product/SelectProductState.svelte';
	import InputDeliveryFee from '$lib/components/product/InputDeliveryFee.svelte';
	import SelectDeliveryType from '$lib/components/product/SelectDeliveryType.svelte';
	import ProductList from '$lib/components/product/ProductList.svelte';
	import InputInventorySetting from '$lib/components/product/InputInventorySetting.svelte';
	import InputProductDetail from '$lib/components/product/InputProductDetail.svelte';
	import Button from '$lib/components/Button.svelte';
	import { saveProductMaster } from '../../../../stores/product.js';
	import { gql } from 'graphql-request';
	import HttpClient from '$data/providers/http_client';
	import ProductService from '$data/services/ProductService';
	import ProductMemo from '$lib/components/product/ProductMemo.svelte';

	export let data;

	let productMaster = data.productMaster;
	let newImages = [null];
	let deletedImageIds = [];
	let otherProductMasters = [],
		selectedProductMasterToChangeOrder;

	const oldColors = [];
	const oldSizes = [];

	for (let color of productMaster.colors) {
		oldColors.push(color);
	}

	for (let size of productMaster.sizes) {
		oldSizes.push(size);
	}

	const ProductMasters = gql`
		query ProductMasters(
			$brand: String
			$subCategory: String
		) {
			productMasters(
				brand_Name: $brand
				subCategory_Name: $subCategory
			) {
				edges {
					node {
						productMasterId
						name
						displayOrder
					}
				}
			}
		}
	`;
	const client = HttpClient.getInstance();

	$: {
		if (
			productMaster.brand &&
			productMaster.subCategory
		)
			client
				.request(ProductMasters, {
					brand: productMaster.brand.name,
					subCategory:
						productMaster.subCategory.name
				})
				.then((result) => {
					otherProductMasters =
						result.productMasters.edges.map(
							(e) => e.node
						);
				});
	}

	function save() {
		if (!productMaster.category) {
			return alert('카테고리를 선택해주세요.');
		} else if (!productMaster.brand) {
			return alert('브랜드를 선택해주세요.');
		} else if (!productMaster.supplier) {
			return alert('대표 거래처를 선택해주세요.');
		} else if (!productMaster.name) {
			return alert('제품명을 입력해주세요.');
		} else if (!productMaster.productNumber) {
			return alert('상품번호를 입력해주세요.');
		} else if (!productMaster.priceConsumer) {
			// return alert('소비자가를 입력해주세요.');
			productMaster.priceConsumer = 0;
		} else if (!productMaster.priceParent) {
			//return alert(
			//'학부모 공급가를 입력해주세요.'
			//);
			productMaster.priceParent = 0;
		} else if (!productMaster.priceGym) {
			return alert(
				'체육관 공급가를 입력해주세요.'
			);
		} else if (!productMaster.priceVendor) {
			alert(
				'프리미엄 체육사 원가를 입력해주세요.'
			);
		} else if (!productMaster.thumbnail) {
			return alert('대표 이미지를 추가해주세요.');
		} else if (!productMaster.priceDelivery) {
			return alert('배송비를 입력해주세요.');
		} else if (
			productMaster.colors.length === 0
		) {
			return alert(
				'하나 이상의 색상을 입력해주세요.'
			);
		} else if (productMaster.sizes.length === 0) {
			return alert(
				'하나 이상의 사이즈를 입력해주세요.'
			);
		} else if (!productMaster.descriptionImage) {
			//return alert(
			//'상품 상세 이미지를 추가해주세요.'
			//);
		}
		const tempProductMaster = JSON.parse(
			JSON.stringify(productMaster)
		);
		tempProductMaster.supplierId =
			tempProductMaster.supplier.id;
		delete tempProductMaster.supplier;

		tempProductMaster.categoryId =
			tempProductMaster.category.id;
		delete tempProductMaster.category;

		delete tempProductMaster.colors;
		delete tempProductMaster.sizes;

		tempProductMaster.subCategoryId =
			tempProductMaster.subCategory.id;
		delete tempProductMaster.subCategory;

		tempProductMaster.brandId =
			tempProductMaster.brand.id;
		delete tempProductMaster.brand;

		tempProductMaster.thumbnail =
			document.querySelector(
				'input#thumbnail'
			).files[0];

		tempProductMaster.descriptionImage =
			document.querySelector(
				'input#description'
			).files[0];

		// images
		newImages = newImages
			.filter((i) => i !== null)
			.map((i) => i.file);

		delete tempProductMaster.images;

		// products
		const tempProducts = JSON.parse(
			JSON.stringify(tempProductMaster.products)
		);
		delete tempProductMaster.products;
		for (let product of tempProducts) {
			delete product.dateCreated;
			delete product.dateUpdated;
		}

		saveProductMaster(
			tempProductMaster,
			tempProducts,
			newImages,
			deletedImageIds
		);
	}
</script>

<main>
	<section class="flex flex-col">
		<div class="flex flex-wrap">
			<SelectCategory bind:productMaster />
			<div class="mx-5" />
			<SelectBrand bind:productMaster />
			<div class="mx-5" />
			<SelectSupplier bind:productMaster />
			<div class="mx-5" />
			<div>
				<div class="text-lg mt-3">
					상품 전시 순서 변경
				</div>
				<div class="flex space-x-4">
					<div
						class="border rounded flex-col mt-3 w-48 h-60 overflow-y-scroll bg-white"
					>
						{#each otherProductMasters.sort((a, b) => a.displayOrder - b.displayOrder) as op (op.productMasterId)}
							<button
								class="px-3 py-2 w-full text-start {selectedProductMasterToChangeOrder &&
								selectedProductMasterToChangeOrder.productMasterId ===
									op.productMasterId
									? 'bg-primary text-white'
									: ''}"
								on:click={() => {
									selectedProductMasterToChangeOrder =
										op;
								}}
							>
								{op.name}
							</button>
						{/each}
					</div>
					<div
						class="flex flex-col h-60 w-16 justify-center relative"
					>
						{#if selectedProductMasterToChangeOrder}
							<button
								class="fa fa-chevron-up {selectedProductMasterToChangeOrder.displayOrder >
								1
									? 'visible'
									: 'invisible'}"
								on:click={() => {
									let tobeChanged =
										otherProductMasters.find(
											(o) =>
												o.displayOrder ===
												selectedProductMasterToChangeOrder.displayOrder -
													1
										);
									tobeChanged.displayOrder += 1;
									selectedProductMasterToChangeOrder.displayOrder -= 1;
								}}
							/>
							<div class="my-4" />
							<button
								class="fa fa-chevron-down
								{selectedProductMasterToChangeOrder.displayOrder <
								otherProductMasters.length
									? 'visible'
									: 'invisible'}
								"
								on:click={() => {
									let tobeChanged =
										otherProductMasters.find(
											(o) =>
												o.displayOrder ===
												selectedProductMasterToChangeOrder.displayOrder +
													1
										);
									tobeChanged.displayOrder -= 1;
									selectedProductMasterToChangeOrder.displayOrder += 1;
								}}
							/>
						{/if}
						<Button
							classes="absolute bottom-0 right-0"
							onClick={async () => {
								if (
									!confirm(
										'상품전시순서를 변경하시겠습니까?'
									)
								)
									return;
								const success =
									await ProductService.changeDisplayOrder(
										{
											changingProductMasters:
												otherProductMasters.map(
													(op) => {
														return {
															productMasterId:
																op.productMasterId,
															displayOrder:
																op.displayOrder
														};
													}
												)
										}
									);

								if (success) {
									alert('저장되었습니다.');
								} else {
									alert('에러');
								}
							}}>변경</Button
						>
					</div>
				</div>
			</div>
		</div>

		<InputProductNameAndPrice
			bind:productMaster
		/>
		<div class="mt-3 flex ">
			<SelectThumbnail bind:productMaster />
			<div class="mx-3" />
			<SelectProductImages
				bind:productMaster
				bind:newImages
				bind:deletedImageIds
			/>
		</div>
		<div class="flex flex-wrap">
			<SelectColor
				bind:productMaster
				{oldColors}
			/>
			<div class="mx-2" />
			<SelectSize bind:productMaster {oldSizes} />
		</div>
		<div class="flex flex-wrap">
			<div
				class="mt-5 flex border rounded p-5 items-start flex-1 min-w-[500px] justify-around bg-white"
			>
				<div class="flex flex-col">
					<InputDeliveryFee bind:productMaster />
					<SelectProductState
						bind:productMaster
					/>
					<div class="my-5" />
				</div>
				<SelectDeliveryType bind:productMaster />
			</div>
			<div class="mx-2" />
			<InputInventorySetting bind:productMaster />
		</div>

		<ProductMemo
			bind:productMaster={productMaster.memo}
		/>

		<Button
			classes="w-20 ml-auto mt-5"
			onClick={save}>저장</Button
		>

		<ProductList bind:productMaster />
		<InputProductDetail bind:productMaster />
	</section>
	<div class="flex justify-end my-10">
		<Button
			classes="hover:bg-error hover:border-error w-20"
			onClick={() => {
				history.back();
			}}>취소</Button
		>
		<div class="mx-2" />
		<Button classes="w-20" onClick={save}
			>저장</Button
		>
	</div>
</main>
