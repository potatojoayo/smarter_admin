import { gql } from 'graphql-request';

export default class OrderQuery {
	static OrderMaster = gql`
		query OrderMaster($id: Int, $orderNumber: String) {
			orderMaster(orderMasterId: $id, orderNumber: $orderNumber) {
				orderState
				id
				orderNumber
				dateCreated
				gymName
				agencyName
				orderer
				phone
				priceTotal
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
					productMaster {
						priceGym
					}
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
						workId
					}
				}
			}
		}
	`;
}
