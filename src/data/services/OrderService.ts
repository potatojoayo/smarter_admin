import HttpClient from '$data/graphql/client';
import OrderQuery from '$data/graphql/queries/OrderQuery';
import OrderMaster from '$data/classes/OrderMaster';
import OrderMutations from '$data/graphql/mutations/OrderMutations';
import ChangeRequestMutation from '$data/graphql/mutations/ChangeRequestMutation';

export default class OrderService {
	static async cancelOrder(variables: {
		csRequestId: number;
	}) {
		const client = HttpClient.getInstance();
		const result = (await client.request(
			OrderMutations.CsCancelOrder,
			variables
		)) as {
			csCancelOrder: {
				success: boolean;
				message: string;
			};
		};

		return {
			success: result.csCancelOrder.success,
			message: result.csCancelOrder.message
		};
	}
	static async getOrderMaster(variables: {
		id?: number;
		orderNumber?: string;
	}) {
		const client = HttpClient.getInstance();
		const result = (await client.request(
			OrderQuery.OrderMaster,
			variables
		)) as {
			orderMaster: {
				id: number;
				orderNumber: string;
				dateCreated: Date;
				priceTotal: number;
				smarterMoney: number;
				orderState: string;
				memo: string;
				isPickUp: boolean;
				priceDelivery: number;
				priceToPay: number;
				gymName?: string;
				agencyName?: string;
				orderer?: string;
				phone?: string;
				paymentRequest?: {
					method: string;
				};
				paymentSuccess?: {
					method: string;
					amount: number;
					requestedAt: Date;
				};
				receiver?: string;
				address?: string;
				detailAddress?: string;
				zipCode?: string;
				deliveryRequest?: string;
				details?: {
					id: number;
					productMaster: {
						priceGym: number;
					};
					product: {
						name: string;
						color: string;
						size: string;
						priceAdditional: number;
					};
					quantity: number;
					draft?: {
						id: number;
						priceWork: number;
						priceWorkLabor: number;
					};
					work?: {
						id: number;
					};
					priceTotal: number;
					state: string;
				}[];
			};
		};
		return new OrderMaster(result.orderMaster);
	}

	static async returnOrders(variables: {
		csRequestId: number;
		orderDetails: {
			id: number;
			quantity: number;
		}[];
		returnReason?: string;
		receiver: string;
		phone: string;
		zipCode: string;
		address: string;
		detailAddress: string;
		memo?: string;
	}) {
		const client = HttpClient.getInstance();
		const { createReturnRequest } =
			(await client.request(
				OrderMutations.CreateReturnRequest,
				variables
			)) as {
				createReturnRequest: {
					success: boolean;
					message: string;
				};
			};
		return {
			success: createReturnRequest.success,
			message: createReturnRequest.message
		};
	}

	static async changeOrders(variables: {
		csRequestId: number;
		orderDetails: {
			orderDetailId: number;
			changingQuantity: number;
			changingProductId: number;
		}[];
		changeReason?: string;
		pickUpReceiver: string;
		pickUpPhone: string;
		pickUpAddress: string;
		pickUpDetailAddress: string;
		pickUpZipCode: string;
		deliveryReceiver: string;
		deliveryPhone: string;
		deliveryAddress: string;
		deliveryDetailAddress: string;
		deliveryZipCode: string;
		memo: string;
	}) {
		const client = HttpClient.getInstance();
		const { createChangeRequest } =
			(await client.request(
				ChangeRequestMutation.CreateChangeRequest,
				variables
			)) as {
				createChangeRequest: {
					success: boolean;
					message: string;
				};
			};
		return {
			success: createChangeRequest.success,
			message: createChangeRequest.message
		};
	}

	static async partialCancelOrders(variables: {
		csRequestId: number;
		orderDetailIds: number[];
	}) {
		const client = HttpClient.getInstance();
		const result = (await client.request(
			OrderMutations.CsPartialCancel,
			variables
		)) as {
			csPartialCancel: {
				success: boolean;
				message: string;
			};
		};
		return {
			success: result.csPartialCancel.success,
			message: result.csPartialCancel.message
		};
	}

	static async additionalOrder(variables: {
		csRequestId: number;
		orderedProducts: {
			productMasterId: number;
			productId: number;
			quantity: number;
			draftId?: number;
			studentNames?: string[];
			userRequest?: string;
		}[];
	}) {
		const client = HttpClient.getInstance();
		const result = (await client.request(
			OrderMutations.AdditionalOrder,
			variables
		)) as {
			additionalOrder: {
				success: boolean;
				message: string;
			};
		};

		return {
			success: result.additionalOrder.success,
			message: result.additionalOrder.message
		};
	}

	static async saveMemo(variables: {
		orderMasterId: number;
		memo: string;
	}) {
		const client = HttpClient.getInstance();
		const result = (await client.request(
			OrderMutations.SaveMemo,
			variables
		)) as {
			saveMemo: {
				success: boolean;
			};
		};

		return result.saveMemo.success;
	}
}
