import { gql } from 'graphql-request';
import HttpClient from '$data/graphql/client.js';
import OrderMaster from '$data/classes/OrderMaster.js';
import type { PageLoad } from './$types';
import CsRequest from '$data/classes/CsRequest';

export const load: PageLoad = async ({
	params,
	url
}) => {
	const id = params.id,
		client = HttpClient.getInstance(),
		csRequestPage =
			url.searchParams.get('csRequestPage') ??
			'1';

	const OrderMasterQuery = gql`
		query OrderMaster(
			$id: ID!
			$csRequestPage: Int
		) {
			orderMasterNode(id: $id) {
				id
				orderMasterId
				orderNumber
				memoByAdmin
				dateCreated
				gymName
				agencyName
				orderer
				phone
				coupon {
					couponName
					price
				}
				priceTotal
				user {
					gym {
						id
						memo
						csRequests(page: $csRequestPage) {
							csRequests {
								id
								requestNumber
								dateRequested
								category
								reason
								csState
								orderState
								requestContents {
									contents
								}
								dateCompleted
							}
							totalCount
						}
					}
				}
				priceDelivery
				smarterMoney
				priceToPay
				paymentRequest {
					method
				}
				paymentSuccess {
					method
					amount
					requestedAt
				}
				receiver
				address
				detailAddress
				zipCode
				deliveryRequest
				isPickUp
				memo
				details {
					id
					thumbnail
					productMaster {
						priceGym
					}
					dateToBeShipped
					userRequest
					isDirectDelivery
					product {
						name
						color
						size
						priceAdditional
					}
					quantity
					draft {
						id
						priceWork
						priceWorkLabor
					}
					priceTotal
					state
					work {
						id
					}
				}
			}
		}
	`;

	const result = await client.request(
		OrderMasterQuery,
		{ id, csRequestPage }
	);
	const orderMaster = new OrderMaster(
		result.orderMasterNode
	);
	const csRequests =
		result.orderMasterNode.user.gym.csRequests.csRequests.map(
			(c) => new CsRequest(c)
		);
	const totalCount =
		result.orderMasterNode.user.gym.csRequests
			.totalCount;

	return {
		orderMaster,
		csRequests,
		totalCount,
		gymMemo: result.orderMasterNode.user.gym.memo,
		gymId: result.orderMasterNode.user.gym.id
	};
};
