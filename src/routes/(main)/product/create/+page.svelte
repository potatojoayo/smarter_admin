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
	import DialogChangeInventory from '$lib/components/inventory/DialogChangeInventory.svelte';

	let productMaster = {
		productNumber: `${Date.now()}`,
		images: [null],
		products: [],
		sizes: [],
		colors: [],
		thresholdInventoryQuantity: 0,
		goalInventoryQuantity: 0,
		state: '숨김',
		deliveryType: '일반배송상품'
	};

	let selectedProductIndex;

	function save() {
		if (!productMaster.category) {
			return alert('카테고리를 선택해주세요.');
		} else if (!productMaster.brand) {
			return alert('브랜드를 선택해주세요.');
		} else if (!productMaster.name) {
			return alert('제품명을 입력해주세요.');
		} else if (!productMaster.priceConsumer) {
			return alert('소비자가를 입력해주세요.');
		} else if (!productMaster.priceParent) {
			return alert(
				'학부모 공급가를 입력해주세요.'
			);
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
			return alert(
				'상품 상세 이미지를 추가해주세요.'
			);
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

		tempProductMaster.subCategoryId =
			tempProductMaster.subCategory.id;
		delete tempProductMaster.subCategory;

		tempProductMaster.brandId =
			tempProductMaster.brand.id;
		delete tempProductMaster.brand;

		tempProductMaster.thumbnail =
			tempProductMaster.thumbnailFile;
		delete tempProductMaster.thumbnailFile;

		tempProductMaster.descriptionImage =
			tempProductMaster.descriptionImageFile;
		delete tempProductMaster.descriptionImageFile;

		const tempImageFiles = JSON.parse(
			JSON.stringify(tempProductMaster.imageFiles)
		);
		delete tempProductMaster.images;
		delete tempProductMaster.imageFiles;

		const tempProducts = JSON.parse(
			JSON.stringify(tempProductMaster.products)
		);
		delete tempProductMaster.products;
		for (let product of tempProducts.products) {
			delete product.dateCreated;
			delete product.dateUpdated;
		}

		saveProductMaster(
			tempProductMaster,
			tempProducts,
			tempImageFiles
		);
	}
</script>

<main>
	<section class="flex flex-col ">
		<div class="flex flex-wrap ">
			<SelectCategory bind:productMaster />
			<div class="mx-5" />
			<SelectBrand bind:productMaster />
			<div class="mx-5" />
			<SelectSupplier bind:productMaster />
		</div>

		<InputProductNameAndPrice
			bind:productMaster
		/>
		<div class="mt-3 flex">
			<SelectThumbnail bind:productMaster />
			<div class="mx-3" />
			<SelectProductImages bind:productMaster />
		</div>
		<div class="flex flex-wrap">
			<SelectColor bind:productMaster />
			<div class="mx-2" />
			<SelectSize bind:productMaster />
		</div>
		<div class="flex flex-wrap">
			<div
				class="mt-5 flex border rounded p-5 items-start flex-1 min-w-[500px] justify-around"
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
		<ProductList
			bind:productMaster
			bind:selectedProductIndex
		/>
		<InputProductDetail bind:productMaster />
	</section>
	<div class="flex justify-end my-10">
		<Button
			classes="hover:bg-error hover:border-error w-20"
			>취소</Button
		>
		<div class="mx-2" />
		<Button classes="w-20" onClick={save}
			>저장</Button
		>
	</div>
</main>

{#if selectedProductIndex != null}
	<DialogChangeInventory
		bind:productMaster
		{selectedProductIndex}
	/>
{/if}
