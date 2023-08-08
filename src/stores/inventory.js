import { writable } from 'svelte/store';
import {
	isLoading,
	isOverlayOpened
} from './global_setting.js';
import HttpClient from '../data/providers/http_client';
import InventoryService from '../data/services/inventory';

const http = HttpClient.getInstance();

export const selectedProduct = writable();

export const selectedOrder = writable();

export const selectedPurchase = writable({
	id: 1,
	dateCreated: new Date(),
	dateUpdated: new Date(),
	supplier: {
		id: 1,
		name: '휠라 본사',
		manager: '김휠라',
		phone: '010-5132-5132',
		fax: '053-1513-2332',
		email: 'example@google.com'
	},
	products: [
		{
			name: '휠라 품도복',
			color: '흰색',
			size: '100',
			dateCreated: new Date(),
			priceVendor: 18000,
			inventoryQuantity: 50,
			expectedInventoryQuantity: 50,
			purchasingQuantity: 100,
			goalInventoryQuantity: 200,
			pricePurchase: 5000000
		},
		{
			name: '휠라 품도복',
			color: '검정색',
			size: '100',
			dateCreated: new Date(),
			priceVendor: 18000,
			inventoryQuantity: 50,
			expectedInventoryQuantity: 50,
			goalInventoryQuantity: 200,
			purchasingQuantity: 100,
			pricePurchase: 5000000
		},
		{
			name: '휠라 색띠',
			color: '검정색',
			size: '90',
			dateCreated: new Date(),
			priceVendor: 18000,
			inventoryQuantity: 50,
			expectedInventoryQuantity: 50,
			goalInventoryQuantity: 200,
			purchasingQuantity: 100,
			pricePurchase: 5000000
		}
	],
	pricePurchase: 1500000,
	state: '종결',
	dateExpectedReceive: new Date()
});

export const selectedReceive = writable({
	id: 1,
	dateCreated: new Date(),
	purchase: {
		dateCreated: new Date(),
		dateUpdated: new Date(),
		dateExpectedReceive: new Date(),
		state: '종결'
	},
	supplier: {
		id: 1,
		name: '휠라 본사',
		manager: '김휠라',
		phone: '010-5132-5132',
		fax: '053-1513-2332',
		email: 'example@google.com'
	},
	products: [
		{
			name: '휠라 품도복',
			color: '흰색',
			size: '100',
			dateCreated: new Date(),
			priceVendor: 18000,
			inventoryQuantity: 50,
			purchasedQuantity: 100,
			receivedQuantity: 70,
			notReceivedQuantity: 30,
			priceReceived: 4000000,
			pricePurchase: 5000000,
			reasonNotReceived: '재고부족'
		},
		{
			name: '휠라 품도복',
			color: '검정색',
			size: '100',
			dateCreated: new Date(),
			priceVendor: 18000,
			inventoryQuantity: 50,
			purchasedQuantity: 100,
			receivedQuantity: 70,
			notReceivedQuantity: 30,
			priceReceived: 4000000,
			pricePurchase: 5000000,
			reasonNotReceived: '재고부족'
		},
		{
			name: '휠라 색띠',
			color: '검정색',
			size: '90',
			dateCreated: new Date(),
			priceVendor: 18000,
			inventoryQuantity: 50,
			purchasedQuantity: 100,
			receivedQuantity: 70,
			notReceivedQuantity: 30,
			priceReceived: 4000000,
			pricePurchase: 5000000,
			reasonNotReceived: '재고부족'
		}
	],
	pricePurchase: 1500000
});

export const isChangeInventoryDialogOpen =
	writable(false);

export const isAddProductDialogOpen =
	writable(false);

export function openChangeInventoryDialog() {
	isChangeInventoryDialogOpen.set(true);
	isOverlayOpened.set(true);
}

export function closeChangeInventoryDialog() {
	selectedProduct.set(null);
	isChangeInventoryDialogOpen.set(false);
	isOverlayOpened.set(false);
}

export function openAddProductDialog() {
	isAddProductDialogOpen.set(true);
	isOverlayOpened.set(true);
}

export function closeAddProductDialog() {
	isAddProductDialogOpen.set(false);
	isOverlayOpened.set(false);
}

export const inventoryChangeHistory = writable([
	{
		productNumber: 'P15123213',
		dateCreated: new Date(),
		category: '도복',
		subCategory: '품도복',
		name: '휠라 품도복',
		brand: '휠라',
		color: '흰색',
		size: '100',
		previousQuantity: 123,
		changingQuantity: 10,
		afterQuantity: 133,
		reason: '입고'
	}
]);

export const inventoryPurchases = writable([
	{
		id: 1,
		dateCreated: new Date(),
		supplier: {
			id: 1,
			name: '휠라 본사',
			manager: '김휠라',
			phone: '010-5132-5132',
			fax: '053-1513-2332',
			email: 'example@google.com'
		},
		products: [
			'휠라 품도복',
			'휠라 색띠',
			'프로스펙스 양면호구'
		],
		totalPrice: 1500000,
		state: '발주대기',
		dateExpectedReceive: new Date()
	},
	{
		id: 2,
		dateCreated: new Date(),
		supplier: {
			id: 1,
			name: '휠라 본사',
			manager: '김휠라',
			phone: '010-5132-5132',
			fax: '053-1513-2332',
			email: 'example@google.com'
		},
		products: [
			'휠라 품도복',
			'휠라 색띠',
			'프로스펙스 양면호구'
		],
		totalPrice: 1500000,
		state: '발주대기',
		dateReceive: new Date()
	},
	{
		id: 2,
		dateCreated: new Date(),
		supplier: {
			id: 1,
			name: '휠라 본사',
			manager: '김휠라',
			email: 'example@google.com',
			phone: '010-5132-5132',
			fax: '053-1513-2332'
		},
		products: [
			'휠라 품도복',
			'휠라 색띠',
			'프로스펙스 양면호구'
		],
		totalPrice: 1500000,
		state: '발주진행중',
		dateReceive: new Date()
	}
]);

export const inventoryReceives = writable([
	{
		id: 1,
		receiveNumber: 'R20221513',
		purchaseNumber: 'PO21512',
		purchaseId: 1,
		dateCreated: new Date(),
		supplier: {
			id: 1,
			name: '휠라 본사',
			manager: '김휠라',
			phone: '010-5132-5132',
			fax: '053-1513-2332',
			email: 'example@google.com'
		},
		products: [
			'휠라 품도복',
			'휠라 색띠',
			'프로스펙스 양면호구'
		],
		receivedQuantity: 150,
		notReceivedQuantity: 30,
		totalPrice: 1500000,
		state: '부분종결',
		datePurchased: new Date()
	},
	{
		id: 2,
		receiveNumber: 'R20221514',
		purchaseNumber: 'PO21512',
		purchaseId: 1,
		dateCreated: new Date(),
		supplier: {
			id: 1,
			name: '휠라 본사',
			manager: '김휠라',
			phone: '010-5132-5132',
			fax: '053-1513-2332',
			email: 'example@google.com'
		},
		products: [
			'휠라 품도복',
			'휠라 색띠',
			'프로스펙스 양면호구'
		],
		receivedQuantity: 150,
		notReceivedQuantity: 30,
		totalPrice: 1500000,
		state: '발주대기',
		datePurchased: new Date()
	},
	{
		id: 3,
		receiveNumber: 'R20221516',
		purchaseNumber: 'PO21512',
		purchaseId: 1,
		dateCreated: new Date(),
		supplier: {
			id: 1,
			name: '휠라 본사',
			manager: '김휠라',
			email: 'example@google.com',
			phone: '010-5132-5132',
			fax: '053-1513-2332'
		},
		products: [
			'휠라 품도복',
			'휠라 색띠',
			'프로스펙스 양면호구'
		],
		receivedQuantity: 150,
		notReceivedQuantity: 30,
		totalPrice: 1500000,
		state: '발주진행중',
		datePurchased: new Date()
	}
]);

export const products = writable([
	{
		id: 1,
		productMasterId: 1,
		productNumber: 'P1523123',
		modelNumber: 'P1523123_w_100',
		category: '도복',
		subCategory: '품도복',
		name: '휠라 품도복',
		brand: '휠라',
		color: '흰색',
		size: '100',
		state: '판매중',
		inventoryQuantity: 100,
		expectedInventoryQuantity: 30,
		thresholdInventoryQuantity: 50,
		goalInventoryQuantity: 200,
		dateCreated: new Date(),
		defaultSupplier: '휠라본사'
	},
	{
		id: 2,
		productMasterId: 1,
		productNumber: 'P1523123',
		modelNumber: 'P1523123_w_105',
		category: '도복',
		subCategory: '품도복',
		name: '휠라 품도복',
		brand: '휠라',
		color: '흰색',
		size: '105',
		state: '판매중',
		inventoryQuantity: 0,
		expectedInventoryQuantity: 30,
		thresholdInventoryQuantity: 50,
		goalInventoryQuantity: 200,
		dateCreated: new Date(),
		defaultSupplier: '휠라본사'
	},
	{
		id: 3,
		productMasterId: 1,
		productNumber: 'P1523123',
		modelNumber: 'P1523123_w_110',
		category: '도복',
		subCategory: '품도복',
		name: '휠라 품도복',
		brand: '휠라',
		color: '흰색',
		size: '110',
		state: '판매중',
		inventoryQuantity: 100,
		expectedInventoryQuantity: 30,
		thresholdInventoryQuantity: 50,
		goalInventoryQuantity: 200,
		dateCreated: new Date(),
		defaultSupplier: '휠라본사'
	}
]);

export async function createSupplier(supplier) {
	await http.request(
		InventoryService.UpdateSupplier,
		{ supplier }
	);
}

export async function getSuppliers() {
	const result = await http.request(
		InventoryService.Suppliers
	);
	return result.suppliers;
}

export async function getInventoryProducts(
	category,
	subCategory,
	brand,
	keyword,
	offset
) {
	const result = await http.request(
		InventoryService.InventoryProducts,
		{
			name: keyword,
			offset,
			category,
			subCategory,
			brand
		}
	);
	return {
		products: result.products.edges.map(
			(e) => e.node
		),
		totalCount: result.products.totalCount
	};
}

export async function changeInventoryQuantity(
	productId,
	quantity,
	reason
) {
	const result = await http.request(
		InventoryService.ChangeInventoryQuantity,
		{ productId, quantity, reason }
	);
	return result.changeInventoryQuantity.success;
}

export async function getChangeHistories(
	page,
	dateFrom,
	dateTo,
	name
) {
	isLoading.set(true);
	let offset = (page - 1) * 20;
	const result = await http.request(
		InventoryService.ChangeHistories,
		{
			offset,
			dateFrom,
			dateTo,
			name
		}
	);

	isLoading.set(false);
	return {
		histories: result.changeHistories.edges.map(
			(e) => e.node
		),
		totalCount: result.changeHistories.totalCount
	};
}

export async function createInventoryOrder(
	productIds
) {
	const result = await http.request(
		InventoryService.CreateInventoryOrder,
		{ productIds }
	);
	return result.createInventoryOrder.success;
}

export async function getInventoryOrders(
	page,
	dateFrom,
	dateTo,
	state
) {
	if (state === '전체')
		state = ['발주대기', '발주진행중'];
	else {
		state = [state];
	}
	isLoading.set(true);
	let offset = (page - 1) * 20;
	const result = await http.request(
		InventoryService.InventoryOrders,
		{
			offset,
			dateFrom,
			dateTo,
			state
		}
	);

	isLoading.set(false);
	return {
		orders: result.inventoryOrders.edges.map(
			(e) => e.node
		),
		totalCount: result.inventoryOrders.totalCount
	};
}

export async function getInventoryOrder(id) {
	const result = await http.request(
		InventoryService.InventoryOrder,
		{
			id
		}
	);
	return {
		order: result.inventoryOrder,
		suppliers: result.suppliers
	};
}

export async function startInventoryOrder(id) {
	const result = await http.request(
		InventoryService.StartInventoryOrder,
		{
			id
		}
	);
	return result.startInventoryOrder.success;
}

export async function receive(order) {
	let details = order.details.edges.map((e) => {
		let detail = e.node;
		return {
			quantityReceived: detail.receivedQuantity,
			quantityNotReceived:
				detail.notReceivedQuantity ?? 0,
			reason: detail.reasonNotReceived,
			inventoryOrderDetailId: detail.detailId
		};
	});
	const result = await http.request(
		InventoryService.ReceiveOrder,
		{ details }
	);
	return result.createInventoryReceived.success;
}

export async function saveInventoryOrder(order) {
	let details = order.details.edges.map((e) => {
		let detail = e.node;
		return {
			quantityOrdered: detail.quantityOrdered,
			inventoryDetailId: detail.detailId
		};
	});
	let date = null;
	try {
		date = new Date(
			order.dateScheduledReceiving
		).toISOString();
	} catch (_) {}
	const result = await http.request(
		InventoryService.SaveInventoryOrder,
		{
			inventoryOrderMasterId: order.orderId,
			supplierId: order.supplier.id,
			dateScheduledReceiving: date,
			inventoryOrderDetails: details
		}
	);
	return result.saveInventoryOrder.success;
}

export async function updateInventoryOrder(
	orderId
) {
	const result = await http.request(
		InventoryService.UpdateInventoryOrder,
		{ inventoryOrderMasterId: orderId }
	);
	return result.updateInventoryOrder.success;
}
export async function addInventoryOrderDetails(
	orderId,
	productIds
) {
	const result = await http.request(
		InventoryService.AddInventoryOrderDetails,
		{
			inventoryOrderMasterId: orderId,
			productIds
		}
	);
	return result.addInventoryOrderDetails.success;
}

export async function deleteInventoryOrderDetails(
	ids
) {
	const result = await http.request(
		InventoryService.DeleteInventoryOrderDetails,
		{
			ids
		}
	);
	return result.deleteInventoryOrderDetails
		.success;
}

export async function getInventoryReceives(
	page,
	dateFrom,
	dateTo,
	state
) {
	if (state === '전체') state = '';
	isLoading.set(true);
	let offset = (page - 1) * 20;
	const result = await http.request(
		InventoryService.InventoryReceivedMasters,
		{
			offset,
			dateFrom,
			dateTo,
			state
		}
	);

	isLoading.set(false);
	return {
		receives:
			result.inventoryReceivedMasters.edges.map(
				(e) => e.node
			),
		totalCount:
			result.inventoryReceivedMasters.totalCount
	};
}

export async function getInventoryReceived(id) {
	const result = await http.request(
		InventoryService.InventoryReceivedMaster,
		{ id }
	);
	return result.inventoryReceivedMaster;
}

export async function additionalReceive(details) {
	const result = await http.request(
		InventoryService.AdditionalReceive,
		{ details }
	);
	return result.additionalReceive.success;
}
