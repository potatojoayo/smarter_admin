import { writable } from 'svelte/store';
import kpop from 'kpop';
import HttpClient from '../data/providers/http_client';
import ProductService from '../data/services/product';

const http = HttpClient.getInstance();

export const checkedProducts = writable([]);
export const productPage = writable(1);
export const category = writable();
export const subCategory = writable();
export const brand = writable();

export async function completeDraftRequest(
	draftRequestId,
	drafts
) {
	for (let draft of drafts) {
		if (!draft.image && !draft.imageFile) {
			alert('시안 이미지를 선택해주세요.');
			return;
		}
		if (
			!draft.priceWork ||
			!draft.priceWorkLabor
		) {
			alert(
				'작업비, 작업용역를 모두 입력해주세요'
			);
			return;
		}
	}
	const result = await http.request(
		ProductService.CompleteDraftRequest,
		{
			draftRequestId,
			drafts
		}
	);
	return result['completeDraftRequest'][
		'success'
	];
}

export async function getDraftRequest(id) {
	const result = await http.request(
		ProductService.DraftRequest,
		{ id }
	);

	return result.draftRequest;
}

export async function getDraftRequests(
	state,
	page,
	keyword
) {
	let offset = (+page - 1) * 20;
	const result = await http.request(
		ProductService.DraftRequests,
		{ state, offset, keyword }
	);

	return {
		draftRequests: result.draftRequests.edges.map(
			(e) => e.node
		),
		totalCount: result.draftRequests.totalCount
	};
}

export async function getProductMasterNode(
	nodeId
) {
	const result = await http.request(
		ProductService.ProductMasterNode,
		{ nodeId }
	);

	return result.productMasterNode;
}

export async function getProductMaster(id) {
	const result = await http.request(
		ProductService.ProductMaster,
		{ id }
	);

	return result.productMaster;
}

export async function getProductMasters(
	page,
	category,
	subCategory,
	brand,
	state,
	name,
	count = 20
) {
	if (category === '전체') {
		category = null;
	}
	if (brand === '전체') {
		brand = null;
	}
	if (subCategory === '전체') {
		subCategory = null;
	}
	if (state === '전체') {
		state = null;
	}
	const result = await http.request(
		ProductService.ProductMasters,
		{
			category,
			subCategory,
			state,
			brand,
			offset: (+page - 1) * count,
			name,
			count
		}
	);

	return {
		productMasters:
			result.productMasters.edges.map(
				(e) => e.node
			),
		totalCount: result.productMasters.totalCount
	};
}

export async function saveProductMaster(
	productMaster,
	products,
	newImages,
	deletedImageIds
) {
	// 저장
	const result = await http.request(
		ProductService.CreateOrUpdateProductMaster,
		{
			productMaster,
			products,
			newImages,
			deletedImageIds
		}
	);

	let duplicated =
		result.createOrUpdateProductMaster.duplicated;

	if (duplicated) {
		return alert('중복된 상품번호입니다.');
	}

	alert('상품이 저장되었습니다.');
	history.back();
}

export function addNewProduct(
	productMaster,
	color,
	size
) {
	let codeColor = kpop
		.romanize(color)
		.substring(0, 3);
	let codeSize = size.substring(0, 3);
	productMaster.products.push({
		modelNumber: `${productMaster.productNumber}_${codeColor}_${codeSize}`,
		name: productMaster.name,
		color: color,
		size: size,
		priceAdditional: 0,
		inventoryQuantity: 0,
		thresholdInventoryQuantity:
			productMaster.thresholdInventoryQuantity,
		goalInventoryQuantity:
			productMaster.goalInventoryQuantity,
		state: productMaster.state,
		expectedInventoryQuantity: 0,
		dateCreated: new Date(),
		dateUpdated: new Date()
	});
}

export async function updateDraftImage(
	draftId,
	image
) {
	const result = await http.request(
		ProductService.UpdateDraftImage,
		{ draftId, image }
	);
}

export const wBrands = writable([
	{
		id: 1,
		name: '드래곤',
		query: 'dragon',
		order: 0
	}
]);

export async function saveCategories(
	updatingCategories,
	deletingCategoryIds
) {
	const result = await http.request(
		ProductService.updateCategory,
		{ updatingCategories, deletingCategoryIds }
	);
	return {
		categories: result.updateCategory.categories,
		productExists:
			result.updateCategory.productExists
	};
}

export async function getCategories() {
	const result = await http.request(
		ProductService.getCategories
	);

	return result.categories;
}

export async function getParentCategories() {
	const result = await http.request(
		ProductService.getCategories,
		{
			depth: 0
		}
	);

	return result.categories;
}

export async function getSubCategories(parent) {
	const result = await http.request(
		ProductService.getCategories,
		{
			depth: 1,
			parent
		}
	);

	return result.categories;
}

export async function saveBrands(
	updatingBrands,
	deletingBrandIds
) {
	const result = await http.request(
		ProductService.updateBrands,
		{ updatingBrands, deletingBrandIds }
	);
	return {
		brands: result.updateBrand.brands,
		productExists:
			result.updateBrand.productExists
	};
}

export async function getBrands() {
	const result = await http.request(
		ProductService.getBrands
	);

	return result.brands;
}

export async function getProductMastersEasyOrder(
	page,
	name,
	userId,
	category,
	subCategory,
	brand
) {
	if (category === '전체') {
		category = null;
	}
	if (subCategory === '전체') {
		subCategory = null;
	}
	if (brand === '전체') {
		brand = null;
	}
	const result = await http.request(
		ProductService.ProductMastersEasyOrder,
		{
			offset: (+page - 1) * 10,
			name,
			userId,
			category,
			subCategory,
			brand
		}
	);

	return {
		productMasters:
			result.productMasters.edges.map(
				(e) => e.node
			),
		totalCount: result.productMasters.totalCount
	};
}

export async function getProducts(
	page,
	category,
	subCategory,
	brand,
	name
) {
	if (category === '전체') {
		category = null;
	}
	if (brand === '전체') {
		brand = null;
	}
	const result = await http.request(
		ProductService.ProductsOrderByInventoryQuantity,
		{
			category,
			subCategory,
			brand,
			offset: (+page - 1) * 20,
			name
		}
	);

	return {
		products: result.products.edges.map(
			(e) => e.node
		),
		totalCount: result.products.totalCount
	};
}

export async function searchProductMasters(
	keyword,
	userId,
	category,
	subCategory,
	brand
) {
	const result = await http.request(
		ProductService.SearchProductMasters,
		{
			keyword,
			userId,
			category,
			subCategory,
			brand
		}
	);

	return result.productMasters.edges.map(
		(e) => e.node
	);
}
