import { gql } from 'graphql-request';

export class OrderService {
	static PickUp = gql`
		mutation PickUp($orderMasterIds: [Int]) {
			pickUp(orderMasterIds: $orderMasterIds) {
				success
			}
		}
	`;
	static ReadyForDelivery = gql`
		mutation ReadyForDelivery(
			$orderDetailNumbers: [String]
		) {
			readyForDelivery(
				orderDetailNumbers: $orderDetailNumbers
			) {
				success
			}
		}
	`;

	static ProceedPaidOrders = gql`
		mutation ProceedPaidOrders(
			$orderMasterIds: [Int]
		) {
			proceedPaidOrders(
				orderMasterIds: $orderMasterIds
			) {
				success
			}
		}
	`;

	static ProceedPaidOrderDetails = gql`
		mutation ProceedPaidOrderDetails(
			$orderDetailIds: [Int]
		) {
			proceedPaidOrderDetails(
				orderDetailIds: $orderDetailIds
			) {
				success
			}
		}
	`;

	static DeleteEasyOrderRequests = gql`
		mutation DeleteEasyOrderRequests(
			$easyOrderIds: [Int]
		) {
			deleteEasyOrderRequests(
				easyOrderIds: $easyOrderIds
			) {
				success
			}
		}
	`;

	static CancelEasyOrder = gql`
		mutation CancelEasyOrder(
			$orderMasterId: Int!
		) {
			cancelEasyOrder(
				orderMasterId: $orderMasterId
			) {
				success
			}
		}
	`;
	static TodayClaimCountByState = gql`
		query TodayClaimCountByState($state: String) {
			todayClaimCountByState(state: $state)
		}
	`;
	static TodayEasyOrderCountByState = gql`
		query TodayEasyOrderCountByState(
			$state: String
		) {
			todayEasyOrderCountByState(state: $state)
		}
	`;
	static TodayDeliveryOrderCountByState = gql`
		query TodayDeliveryOrderCountByState(
			$state: String
		) {
			todayDeliveryOrderCountByState(
				state: $state
			)
		}
	`;
	static TodayCancelOrderCountByState = gql`
		query TodayCancelOrderCountByState(
			$state: String
		) {
			todayCancelOrderCountByState(state: $state)
		}
	`;
	static TodayOrderCountByState = gql`
		query TodayOrderCountByState($state: String) {
			todayOrderCountByState(state: $state)
		}
	`;
	static CompleteEasyOrder = gql`
		mutation CompleteEasyOrder(
			$easyOrderId: Int
			$orderedProducts: [OrderedProductInputType]
			$memo: String
			$addressId: Int
			$easyOrderIsVisit: Boolean
		) {
			completeEasyOrder(
				easyOrderId: $easyOrderId
				orderedProducts: $orderedProducts
				memo: $memo
				addressId: $addressId
				easyOrderIsVisit: $easyOrderIsVisit
			) {
				success
			}
		}
	`;

	static EasyOrder = gql`
		query EasyOrder($id: ID!) {
			easyOrder(id: $id) {
				easyOrderId
				contents
				state
				isVisit
				isOrderMore
				dateCreated
				dateCompleted
				files {
					file
				}
				order {
					orderNumber
					id
				}
				defaultAddress {
					id
					name
					receiver
					address
					detailAddress
					zipCode
					phone
				}
				user {
					userId
					name
					phone
					addresses {
						id
						user {
							name
						}
						name
						receiver
						zipCode
						address
						detailAddress
						phone
					}
					gym {
						name
						agency {
							name
						}
					}
				}
			}
		}
	`;
	static EasyOrders = gql`
		query EasyOrders(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
			$state: String
			$keyword: String
		) {
			easyOrders(
				offset: $offset
				state: $state
				dateCreated_Gte: $dateFrom
				dateCreated_Lte: $dateTo
				keyword: $keyword
				first: 20
			) {
				totalCount
				edges {
					node {
						id
						easyOrderId
						contents
						state
						dateCreated
						files {
							file
						}
						dateCompleted
						order {
							orderNumber
							id
						}
						user {
							name
							phone

							gym {
								name
								agency {
									name
								}
							}
						}
					}
				}
			}
		}
	`;
	// mutation {
	// 	selectAddress(newAddress:{
	// 	  userId:4,
	// 	  name:"테스트",
	// 	  receiver: "테스트",
	// 	  phone:"01012341234",
	// 	  address:"test",
	// 	  detailAddress:"test",
	// 	  zipCode:"teset"
	// 	}) {
	// 	  success
	// 	  selectedAddress{
	// 		id
	// 		address
	// 	  }
	// 	}
	//   }
	static SelectAddress = gql`
		mutation SelectAddress(
			$newAddress: AddressInputType
		) {
			selectAddress(newAddress: $newAddress) {
				success
				selectedAddress {
					id
					address
					phone
					receiver
					zipCode
					detailAddress
					name
				}
			}
		}
	`;

	static DeclineClaim = gql`
		mutation DeclineClaim($claimIds: [Int]) {
			declineClaim(claimIds: $claimIds) {
				success
			}
		}
	`;
	static CompleteClaim = gql`
		mutation CompleteClaim(
			$claimIds: [Int]
			$refundPrice: Int
		) {
			completeClaim(
				claimIds: $claimIds
				refundPrice: $refundPrice
			) {
				success
			}
		}
	`;
	static Claims = gql`
		query Claims(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
			$state: String
			$gym: String
		) {
			claims(
				offset: $offset
				state: $state
				dateCreated_Gte: $dateFrom
				dateCreated_Lte: $dateTo
				user_Gym_Name_Icontains: $gym
			) {
				totalCount
				edges {
					node {
						claimId
						state
						refundPrice
						reason
						quantity
						priceTotal
						priceTotalWorkLabor
						dateCreated
						dateUpdated
						user {
							gym {
								name
							}
							name
							phone
						}
						orderDetail {
							orderMaster {
								id
								orderNumber
								receiver
								address
								detailAddress
								zipCode
							}
							product {
								name
								size
								color
							}
						}
					}
				}
			}
		}
	`;

	static OrderDetails = gql`
		query OrderDetails(
			$gymName: String
			$dateFrom: DateTime
			$dateTo: DateTime
			$offset: Int
			$state: String
			$works_Subcontractor_Name_Icontains
		) {
			orderDetailNodes(
				works_Subcontractor_Name_Icontains: $works_Subcontractor_Name_Icontains
			) {
				totalCount
				edges {
					node {
						orderMaster {
							orderNumber
							user {
								name
								gym {
									name
								}
								phone
							}
						}
						product {
							name
							color
							size
						}
						quantity
						state
						work {
							dateCreated
							subcontractor {
								name
							}
						}
					}
				}
			}
		}
	`;
	static Delivery = gql`
		query Delivery($orderDetailId: Int) {
			delivery(orderDetailId: $orderDetailId) {
				trackingNumber
				photo
				deliveryAgency {
					name
				}
				orderMaster {
					phone
					deliveryRequest
					zipCode
					address
					detailAddress
					receiver
					user {
						name
						gym {
							name
						}
					}
				}
				orderDetails {
					product {
						name
						color
						size
					}
					quantity
				}
			}
		}
	`;

	static StartShipping = gql`
		mutation StartShipping(
			$orderDetailIds: [Int]
			$deliveryAgencyId: Int
			$trackingNumber: String
			$photo: Upload
		) {
			startShipping(
				orderDetailIds: $orderDetailIds
				deliveryAgencyId: $deliveryAgencyId
				trackingNumber: $trackingNumber
				photo: $photo
			) {
				success
			}
		}
	`;

	static StartBundleShipping = gql`
		mutation BundleDelivery(
			$orderDetailIds: [Int]
			$deliveryAgencyId: Int
			$trackingNumber: String
			$photo: Upload
		) {
			bundleDelivery(
				orderDetailIds: $orderDetailIds
				deliveryAgencyId: $deliveryAgencyId
				trackingNumber: $trackingNumber
				photo: $photo
			) {
				success
			}
		}
	`;

	static ChangeState = gql`
		mutation ChangeState(
			$orderDetailNumbers: [String]
			$state: String!
		) {
			changeState(
				orderDetailNumbers: $orderDetailNumbers
				state: $state
			) {
				success
			}
		}
	`;

	static CompletePaymentsWithoutBank = gql`
		mutation CompletePaymentsWithoutBank(
			$orderMasterNumbers: [String]
		) {
			completePaymentsWithoutBank(
				orderMasterNumbers: $orderMasterNumbers
			) {
				success
			}
		}
	`;

	static EasyOrderToPaid = gql`
		mutation EasyOrderToPaid(
			$orderNumbers: [String]
		) {
			easyOrderToPaid(
				orderNumbers: $orderNumbers
			) {
				success
			}
		}
	`;

	static DeleteOrderMasters = gql`
		mutation DeleteOrderMasters(
			$orderNumbers: [String]
		) {
			deleteOrderMasters(
				orderNumbers: $orderNumbers
			) {
				success
			}
		}
	`;

	static OrderMaster = gql`
		query OrderMaster($id: ID!) {
			orderMasterNode(id: $id) {
				orderMasterId
				orderNumber
				dateCreated
				states
				isActive
				priceTotal
				priceTotalWork
				priceTotalWorkLabor
				priceDelivery
				priceToPay
				isPickUp

				receiver
				address
				detailAddress
				zipCode
				phone
				deliveryRequest
				memoByAdmin
				smarterMoneyHistory {
					amount
				}
				paymentRequest {
					method
					amount
				}

				paymentSuccess {
					requestedAt
					method
					amount
				}

				user {
					name
					phone
					refundAccountBank
					refundAccountNo
					gym {
						agency {
							name
						}
						name
					}
				}
				details {
					id
					quantity
					state
					priceProducts
					priceTotal
					priceWork
					priceWorkLabor
					work {
						subcontractor {
							name
						}
					}
					product {
						inventoryQuantity
						productMaster {
							thumbnail
						}
						name
						color
						size
					}
				}
			}
		}
	`;

	static ToggleActive = gql`
		mutation ToggleActive($orderMasterId: Int) {
			toggleActive(
				orderMasterId: $orderMasterId
			) {
				success
			}
		}
	`;

	static UpdateMemo = gql`
		mutation ToggleActive(
			$orderMasterId: Int
			$memo: String
		) {
			updateMemo(
				orderMasterId: $orderMasterId
				memo: $memo
			) {
				success
			}
		}
	`;

	static OrderMasters = gql`
		query OrderMasters(
			$keyword: String
			$dateFrom: DateTime
			$dateTo: DateTime
			$offset: Int
			$state: String
		) {
			orderMasters(
				dateCreated_Lte: $dateTo
				dateCreated_Gte: $dateFrom
				keyword: $keyword
				first: 20
				offset: $offset
				state: $state
			) {
				totalCount
				edges {
					node {
						orderMasterId
						id
						priceToPay
						orderMasterId
						orderNumber
						dateCreated
						states
						coupon {
							couponName
							price
						}
						priceTotal
						isActive
						memoByAdmin
						hasUserRequest
						zipCode
						isPickUp
						priceTotalWorkLabor
						receiver
						priceDelivery
						deliveryRequest
						address
						detailAddress
						user {
							name
							phone
							gym {
								agency {
									name
								}
								name
							}
						}
						smarterMoneyHistory {
							transactionType
							amount
						}
					}
				}
			}
		}
	`;

	static OrderMastersByIds = gql`
		query OrderMastersByIds($ids: [Int]) {
			orderMastersByIds(ids: $ids) {
				smarterMoney
				orderMasterId
				id
				orderMasterId
				orderNumber
				dateCreated
				coupon {
					couponName
					price
				}
				priceTotal
				isActive
				memoByAdmin
				zipCode
				isPickUp
				receiver
				priceDelivery
				deliveryRequest
				priceToPay
				address
				detailAddress
				details {
					id
					quantity
					state
					priceProducts
					priceTotal
					priceWork
					priceWorkLabor
					work {
						subcontractor {
							name
						}
					}
					product {
						inventoryQuantity
						productMaster {
							thumbnail
						}
						name
						color
						size
					}
				}
				user {
					name
					phone
					gym {
						agency {
							name
						}
						name
					}
				}
			}
		}
	`;

	static OrderMastersWithDetails = gql`
		query OrderMasters(
			$keyword: String
			$dateFrom: DateTime
			$dateTo: DateTime
			$offset: Int
			$states: [String]
		) {
			orderMasters(
				dateCreated_Lte: $dateTo
				dateCreated_Gte: $dateFrom
				keyword: $keyword
				first: 20
				offset: $offset
				details_State_In: $states
			) {
				totalCount
				edges {
					node {
						id
						orderMasterId
						orderNumber
						dateCreated
						states
						priceTotal
						isActive
						memoByAdmin
						zipCode

						isPickUp

						priceTotalWorkLabor

						receiver
						priceDelivery
						deliveryRequest

						address
						detailAddress

						user {
							name
							phone
							gym {
								agency {
									name
								}
								name
							}
						}
						smarterMoneyHistory {
							transactionType
							amount
						}
						details {
							id
							orderMaster {
								id
								orderMasterId
							}
							productMaster {
								category {
									name
								}
								priceGym
							}
							userRequest
							orderDetailNumber
							delivery {
								deliveryAgency {
									name
								}
								trackingNumber
								photo
							}
							quantity
							work {
								id
								subcontractor {
									name
								}
							}
							state
							draft {
								id
								image
							}
							studentNames
							priceTotal
							priceWork
							priceWorkLabor
							product {
								inventoryQuantity
								name
								color
								size
							}
						}
					}
				}
			}
		}
	`;

	static OrderDetailsOfMaster = gql`
		query OrderDetailsWithChildren(
			$orderMasterId: Int
		) {
			orderDetailsWithChildren(
				orderMasterId: $orderMasterId
			) {
				addedOrderMasters {
					id
					orderNumber
					details {
						id
						dateToBeShipped
						isDirectDelivery
						orderMaster {
							id
							orderMasterId
						}
						productMaster {
							category {
								name
							}
							priceGym
						}
						userRequest
						orderDetailNumber
						delivery {
							deliveryAgency {
								name
							}
							trackingNumber
							photo
						}
						quantity
						work {
							id
							subcontractor {
								name
							}
						}
						state
						draft {
							id
							image
						}
						studentNames
						priceTotal
						priceWork
						priceWorkLabor
						product {
							inventoryQuantity
							name
							color
							size
						}
					}
				}
				orderDetails {
					id
					dateToBeShipped
					isDirectDelivery
					orderMaster {
						id
						orderMasterId
					}
					productMaster {
						category {
							name
						}
						priceGym
					}
					userRequest
					orderDetailNumber
					delivery {
						deliveryAgency {
							name
						}
						trackingNumber
						photo
					}
					quantity
					work {
						id
						subcontractor {
							name
						}
					}
					state
					draft {
						id
						image
					}
					studentNames
					priceTotal
					priceWork
					priceWorkLabor
					product {
						inventoryQuantity
						name
						color
						size
					}
				}
			}
		}
	`;
}
