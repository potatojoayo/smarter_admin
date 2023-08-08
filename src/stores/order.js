import { get, writable } from 'svelte/store';
import {
	isLoading,
	isOverlayOpened
} from './global_setting.js';
import {
	deliveryItemPhotoFile,
	deliveryItemPhotoImage,
	getDeliveryAgencies,
	selectedDeliveryAgency,
	trackingNumber
} from './delivery.js';
import { OrderService } from '../data/services/order';
import HttpClient from '../data/providers/http_client';
import mixpanel from 'mixpanel-browser';

export const selectedOrder = writable();
export const selectedOrderDetail = writable();

export const checkedOrderMasters = writable([]);
export const checkedOrderMaster = writable();
export const checkedOrderDetails = writable([]);
export const delivery = writable();

export const isBundleDelivery = writable(false);
export const isDraftDialogOpen = writable(false);
export const isStartShippingDialogOpen =
	writable(false);

export const isDeliveryDialogOpen =
	writable(false);

const http = HttpClient.getInstance();

export const wOrders = writable([]);

export function updateOrderStates(orderId) {
	const orderDetailStates = new Set();

	wOrders.update((orders) => {
		const updatedOrders = orders;
		updatedOrders.forEach((order, orderIndex) => {
			if (order.id === orderId) {
				order.orderDetails.forEach((item) => {
					orderDetailStates.add(item.state);
				});
				updatedOrders[
					orderIndex
				].orderDetailStates = Array.from(
					orderDetailStates
				);
			}
		});
		return updatedOrders;
	});
}

export async function openDraftDialog(
	order,
	orderDetail
) {
	selectedOrder.set(order);
	selectedOrderDetail.set(orderDetail);
	isDraftDialogOpen.set(true);
	isOverlayOpened.set(true);
}

export async function openStartShippingDialog(
	order,
	orderDetail
) {
	if (order) selectedOrder.set(order);
	if (orderDetail)
		selectedOrderDetail.set(orderDetail);
	await getDeliveryAgencies();
	isStartShippingDialogOpen.update((o) => {
		isOverlayOpened.set(!o);
		return !o;
	});
}

export async function openDeliveryDialog(
	orderDetail
) {
	delivery.set(await getDelivery(orderDetail.id));
	isDeliveryDialogOpen.set(true);
	isOverlayOpened.set(true);
}

export function closeStartShippingDialog() {
	selectedOrder.set(null);
	selectedOrderDetail.set(null);
	selectedDeliveryAgency.set(null);
	trackingNumber.set(null);
	deliveryItemPhotoImage.set(null);
	deliveryItemPhotoFile.set(null);
	isOverlayOpened.set(false);
	isStartShippingDialogOpen.set(false);
}

export function closeDeliveryDialog() {
	selectedOrderDetail.set(null);
	delivery.set(null);
	isOverlayOpened.set(false);
	isDeliveryDialogOpen.set(false);
}

export function closeDraftDialog() {
	isOverlayOpened.set(false);
	isDraftDialogOpen.set(false);
	selectedOrder.set(null);
	selectedOrderDetail.set(null);
}

export async function changeState(
	orderDetailNumbers,
	state
) {
	const result = await http.request(
		OrderService.ChangeState,
		{
			orderDetailNumbers,
			state
		}
	);
	return result.changeState.success;
}

export async function readyForDelivery(
	orderDetailNumbers
) {
	const result = await http.request(
		OrderService.ReadyForDelivery,
		{
			orderDetailNumbers
		}
	);
	return result.readyForDelivery.success;
}

export async function proceedPaidOrder(
	orderMasterIds
) {
	const result = await http.request(
		OrderService.ProceedPaidOrders,
		{ orderMasterIds }
	);
	return result.proceedPaidOrders.success;
}

export async function proceedPaidOrderDetails(
	orderDetailIds
) {
	const result = await http.request(
		OrderService.ProceedPaidOrderDetails,
		{ orderDetailIds }
	);
	return result.proceedPaidOrderDetails.success;
}

export function finishWork(
	orderId,
	orderDetailId
) {
	wOrders.update((order) => {
		const updatedOrder = order;
		updatedOrder.forEach((o, orderIndex) => {
			if (o.id === orderId) {
				o.orderDetails.forEach(
					(i, orderDetailIndex) => {
						if (i.id === orderDetailId) {
							updatedOrder[
								orderIndex
							].orderDetails[
								orderDetailIndex
							].workState = '완료';
							updatedOrder[
								orderIndex
							].orderDetails[
								orderDetailIndex
							].state = '작업완료';
						}
					}
				);
			}
		});

		return updatedOrder;
	});
	updateOrderStates(orderId);
}

export async function getOrderMasters(
	page,
	dateFrom,
	dateTo,
	state,
	keyword,
	agency
) {
	if (state === '전체') {
		state = null;
	}
	isLoading.set(true);
	const result = await http.request(
		OrderService.OrderMasters,
		{
			offset: (page - 1) * 20,
			dateFrom,
			dateTo,
			state,
			keyword,
			agency
		}
	);
	const orders = result.orderMasters.edges.map(
		(e) => e.node
	);
	isLoading.set(false);
	const totalCount =
		result.orderMasters.totalCount;
	checkedOrderMasters.set([]);
	return { orders, totalCount };
}

export async function getOrderMastersByids(ids) {
	const result = await http.request(
		OrderService.OrderMastersByIds,
		{
			ids
		}
	);

	const orders = result.orderMastersByIds;
	checkedOrderMasters.set([]);
	return orders;
}

export async function getOrderMastersWithDetails(
	page,
	dateFrom,
	dateTo,
	state,
	keyword,
	agency
) {
	let states = state;
	if (typeof state === 'string') states = [state];
	if (state === '전체') {
		states = [];
	}
	isLoading.set(true);
	const result = await http.request(
		OrderService.OrderMastersWithDetails,
		{
			offset: (page - 1) * 20,
			dateFrom,
			dateTo,
			states,
			keyword,
			agency
		}
	);
	const orders = result.orderMasters.edges.map(
		(e) => e.node
	);
	isLoading.set(false);
	const totalCount =
		result.orderMasters.totalCount;
	checkedOrderMasters.set([]);
	return { orders, totalCount };
}

export async function getOrderDetails(
	orderMasterId
) {
	const result = await http.request(
		OrderService.OrderDetailsOfMaster,
		{
			orderMasterId
		}
	);
	const { orderDetails, addedOrderMasters } =
		result.orderDetailsWithChildren;
	console.log(orderDetails);
	console.log(addedOrderMasters);
	return {
		orderDetails,
		addedOrderMasters
	};
}

export async function completePaymentsWithoutBank(
	orderMasterNumbers
) {
	const result = await http.request(
		OrderService.CompletePaymentsWithoutBank,
		{ orderMasterNumbers }
	);
	return result.completePaymentsWithoutBank
		.success;
}

export async function easyOrderToPaid(
	orderNumbers
) {
	const result = await http.request(
		OrderService.EasyOrderToPaid,
		{ orderNumbers }
	);
	return result.easyOrderToPaid.success;
}

export async function deleteOrderMasters(
	orderNumbers
) {
	const result = await http.request(
		OrderService.DeleteOrderMasters,
		{ orderNumbers }
	);
	return result.deleteOrderMasters.success;
}

export async function toggleActive(
	orderMasterId
) {
	const result = await http.request(
		OrderService.ToggleActive,
		{ orderMasterId }
	);
	return result.toggleActive.success;
}

export async function updateMemo(
	orderMasterId,
	memo
) {
	const result = await http.request(
		OrderService.UpdateMemo,
		{ orderMasterId, memo }
	);
	return result.updateMemo.success;
}

export async function getOrderMaster(id) {
	const result = await http.request(
		OrderService.OrderMaster,
		{
			id
		}
	);
	return result.orderMasterNode;
}

export async function startShipping(
	orderDetailIds,
	deliveryAgencyId,
	trackingNumber,
	photo
) {
	if (!deliveryAgencyId) {
		alert('배송사를 선택해주세요.');
		return false;
	}
	if (!trackingNumber) {
		alert('운송장번호를 입력해주세요.');
		return false;
	}

	const isBundle = get(isBundleDelivery);
	const result = await http.request(
		isBundle
			? OrderService.StartBundleShipping
			: OrderService.StartShipping,
		{
			orderDetailIds,
			deliveryAgencyId,
			trackingNumber,
			photo
		}
	);
	let success = isBundle
		? result.bundleDelivery.success
		: result.startShipping.success;
	if (success) {
		get(checkedOrderDetails).forEach((o) => {
			mixpanel.track('배송시작', o);
		});
		alert('선택한 상품의 배송이 시작되었습니다.');
		location.reload();
	} else {
		alert('실패');
	}

	return true;
}

export async function getDelivery(orderDetailId) {
	const result = await http.request(
		OrderService.Delivery,
		{
			orderDetailId: orderDetailId
		}
	);
	return result.delivery;
}

export async function getClaims(
	page,
	dateFrom,
	dateTo,
	state,
	gym
) {
	if (state === '전체') state = '';
	isLoading.set(true);
	let offset = (page - 1) * 20;
	const result = await http.request(
		OrderService.Claims,
		{
			offset,
			dateFrom,
			dateTo,
			state,
			gym
		}
	);
	isLoading.set(false);

	return {
		claims: result.claims.edges.map(
			(e) => e.node
		),
		totalCount: result.claims.totalCount
	};
}

export async function completeClaims(
	claimIds,
	refundPrice
) {
	const result = await http.request(
		OrderService.CompleteClaim,
		{ claimIds, refundPrice }
	);
	return result.completeClaim.success;
}

export async function declineClaims(claimIds) {
	const result = await http.request(
		OrderService.DeclineClaim,
		{ claimIds }
	);
	return result.declineClaim.success;
}

export async function getEasyOrders(
	page,
	dateFrom,
	dateTo,
	state,
	keyword
) {
	if (state === '전체') state = '';
	isLoading.set(true);
	let offset = (page - 1) * 20;
	const result = await http.request(
		OrderService.EasyOrders,
		{
			offset,
			dateFrom,
			dateTo,
			state,
			keyword
		}
	);
	isLoading.set(false);

	return {
		easyOrders: result.easyOrders.edges.map(
			(e) => e.node
		),
		totalCount: result.easyOrders.totalCount
	};
}

export async function getEasyOrder(id) {
	const result = await http.request(
		OrderService.EasyOrder,
		{
			id
		}
	);
	return result.easyOrder;
}

export async function selectAddress(newAddress) {
	const result = await http.request(
		OrderService.SelectAddress,
		{ newAddress }
	);
	return result.selectAddress;
}

export async function completeEasyOrder(
	easyOrderId,
	orderedProducts,
	memo,
	addressId,
	easyOrderIsVisit
) {
	const result = await http.request(
		OrderService.CompleteEasyOrder,
		{
			easyOrderId,
			orderedProducts,
			memo,
			addressId,
			easyOrderIsVisit
		}
	);
	return result.completeEasyOrder.success;
}

export async function todayOrderCountByState(
	state
) {
	const result = await http.request(
		OrderService.TodayOrderCountByState,
		{ state }
	);
	return result.todayOrderCountByState;
}

export async function todayEasyOrderCountByState(
	state
) {
	const result = await http.request(
		OrderService.TodayEasyOrderCountByState,
		{ state }
	);
	return result.todayEasyOrderCountByState;
}

export async function todayCancelOrderCountByState(
	state
) {
	const result = await http.request(
		OrderService.TodayCancelOrderCountByState,
		{ state }
	);
	return result.todayCancelOrderCountByState;
}

export async function todayClaimCountByState(
	state
) {
	const result = await http.request(
		OrderService.TodayClaimCountByState,
		{ state }
	);
	return result.todayClaimCountByState;
}

export async function todayDeliveryOrderCountByState(
	state
) {
	const result = await http.request(
		OrderService.TodayDeliveryOrderCountByState,
		{ state }
	);
	return result.todayDeliveryOrderCountByState;
}

export async function cancelEasyOrder(
	orderMasterId
) {
	const result = await http.request(
		OrderService.CancelEasyOrder,
		{ orderMasterId }
	);
	return result.cancelEasyOrder.success;
}

export async function deleteEasyOrderRequests(
	easyOrderIds
) {
	const result = await http.request(
		OrderService.DeleteEasyOrderRequests,
		{ easyOrderIds }
	);
	return result.deleteEasyOrderRequests.success;
}

export async function pickUp(orderMasterIds) {
	const result = await http.request(
		OrderService.PickUp,
		{ orderMasterIds }
	);
	return result.pickUp.success;
}
