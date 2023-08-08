import { gql } from 'graphql-request';

export default class InventoryService {
	static SaveInventoryOrder = gql`
		mutation SaveInventoryOrder(
			$inventoryOrderMasterId: Int
			$dateScheduledReceiving: DateTime
			$supplierId: Int
			$inventoryOrderDetails: [InventoryOrderInputType]
		) {
			saveInventoryOrder(
				inventoryOrderMasterId: $inventoryOrderMasterId
				dateScheduledReceiving: $dateScheduledReceiving
				supplierId: $supplierId
				inventoryOrderDetails: $inventoryOrderDetails
			) {
				success
			}
		}
	`;
	static ReceiveOrder = gql`
		mutation CreateInventoryReceived(
			$details: [InventoryReceivedInputType]
		) {
			createInventoryReceived(
				inventoryReceivedDetails: $details
			) {
				success
			}
		}
	`;

	static InventoryOrder = gql`
		query InventoryOrder($id: ID!) {
			suppliers {
				id
				name
				manager
				phone
				fax
				email
			}
			inventoryOrder(id: $id) {
				id
				orderId
				state
				priceTotal
				dateCreated
				dateScheduledReceiving
				dateUpdated
				supplier {
					name
					manager
					phone
					email
					fax
				}
				details {
					edges {
						node {
							detailId
							quantityOrdered
							priceVendor
							priceVendorTotal
							name
							color
							size
							inventoryQuantity
							expectedInventoryQuantity
							goalInventoryQuantity
							expectedInventoryQuantity
						}
					}
				}
			}
		}
	`;
	static InventoryOrders = gql`
		query InventoryOrders(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
			$state: [String]
		) {
			inventoryOrders(
				offset: $offset
				dateCreated_Gte: $dateFrom
				dateCreated_Lte: $dateTo
				state_In: $state
				first: 20
			) {
				totalCount
				edges {
					node {
						inventoryOrderNumber
						id
						dateScheduledReceiving
						state
						productNames
						dateCreated
						priceTotal
						supplier {
							name
						}
					}
				}
			}
		}
	`;
	static CreateInventoryOrder = gql`
		mutation CreateInventoryOrder(
			$productIds: [Int]
		) {
			createInventoryOrder(
				productIds: $productIds
			) {
				success
			}
		}
	`;
	static ChangeHistories = gql`
		query ChangeHistories(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
			$name: String
		) {
			changeHistories(
				offset: $offset
				dateCreated_Gte: $dateFrom
				dateCreated_Lte: $dateTo
				product_Name_Icontains: $name
				first: 20
			) {
				totalCount
				edges {
					node {
						dateCreated
						product {
							modelNumber
							productMaster {
								category {
									name
								}
								subCategory {
									name
								}
								brand {
									name
								}
							}
							color
							size
							name
						}
						quantityBefore
						quantityAfter
						quantityChanged
						reason
					}
				}
			}
		}
	`;
	static ChangeInventoryQuantity = gql`
		mutation ChangeInventoryQuantity(
			$productId: Int!
			$quantity: Int!
			$reason: String!
		) {
			changeInventoryQuantity(
				productId: $productId
				quantity: $quantity
				reason: $reason
			) {
				success
			}
		}
	`;

	static InventoryProducts = gql`
		query InventoryProducts(
			$name: String
			$offset: Int
			$category: String
			$subCategory: String
			$brand: String
		) {
			products(
				name_Icontains: $name
				offset: $offset
				first: 20
				orderBy: "inventory_quantity"
				productMaster_Category_Name: $category
				productMaster_SubCategory_Name: $subCategory
				productMaster_Brand_Name: $brand
			) {
				totalCount
				edges {
					node {
						name
						productId
						productMaster {
							id
							productNumber
							category {
								name
							}
							subCategory {
								name
							}
							brand {
								name
							}
						}
						color
						size
						state
						inventoryQuantity
						expectedInventoryQuantity
						thresholdInventoryQuantity
						goalInventoryQuantity
						dateCreated
						modelNumber
					}
				}
			}
		}
	`;
	static UpdateSupplier = gql`
		mutation UpdateSupplier(
			$supplier: SupplierInputType
		) {
			updateSupplier(supplier: $supplier) {
				supplier {
					name
					address
					manager
					phone
					fax
					email
					businessRegistrationNumber
					businessRegistrationCertificate
				}
			}
		}
	`;

	static Supplier = gql`
		query Supplier($id: ID!) {
			supplier(id: $id) {
				id
				name
				manager
				phone
				fax
				email
				address
				businessRegistrationNumber
				businessRegistrationCertificate
			}
		}
	`;

	static Suppliers = gql`
		query Suppliers {
			suppliers {
				id
				name
				manager
				phone
				fax
				email
				address
				businessRegistrationNumber
			}
		}
	`;

	static StartInventoryOrder = gql`
		mutation StartInventoryOrder($id: Int) {
			startInventoryOrder(
				inventoryOrderMasterId: $id
			) {
				success
			}
		}
	`;
	static UpdateInventoryOrder = gql`
		mutation UpdateInventoryOrder(
			$inventoryOrderMasterId: Int
		) {
			updateInventoryOrder(
				inventoryOrderMasterId: $inventoryOrderMasterId
			) {
				success
			}
		}
	`;
	static AddInventoryOrderDetails = gql`
		mutation AddInventoryOrderDetails(
			$inventoryOrderMasterId: Int
			$productIds: [Int]
		) {
			addInventoryOrderDetails(
				inventoryOrderMasterId: $inventoryOrderMasterId
				productIds: $productIds
			) {
				success
			}
		}
	`;
	static DeleteInventoryOrderDetails = gql`
		mutation DeleteInventoryOrderDetails(
			$ids: [Int]
		) {
			deleteInventoryOrderDetails(
				inventoryOrderDetailIds: $ids
			) {
				success
			}
		}
	`;

	static InventoryReceivedMasters = gql`
		query InventoryReceivedMasters(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
			$state: String
		) {
			inventoryReceivedMasters(
				offset: $offset
				dateCreated_Gte: $dateFrom
				dateCreated_Lte: $dateTo
				state: $state
				first: 20
			) {
				totalCount
				edges {
					node {
						priceTotalOrdered
						id
						receiveNumber
						inventoryOrderMaster {
							inventoryOrderNumber
							dateCreated
							supplier {
								name
							}
							productNames
						}
						dateCreated
						state
						quantityTotalReceived
						quantityTotalNotReceived
						priceTotalReceived
					}
				}
			}
		}
	`;

	static InventoryReceivedMaster = gql`
		query InventoryReceivedMaster($id: ID!) {
			inventoryReceivedMaster(id: $id) {
				dateCreated
				priceTotalReceived
				priceTotalOrdered
				priceTotalAdditionalReceived
				quantityTotalOrdered
				quantityTotalReceived
				quantityTotalAdditionalReceived
				quantityTotalNotReceived
				inventoryOrderMaster {
					dateCreated
					supplier {
						name
						manager
						phone
						email
						fax
					}
				}
				state
				details {
					edges {
						node {
							detailId
							name
							color
							size
							priceVendor
							priceAdditionalReceived
							quantityAdditionalReceived
							quantityOrdered
							quantityReceived
							quantityNotReceived
							priceOrdered
							priceReceived
							reasonNotReceived
						}
					}
				}
			}
		}
	`;

	static AdditionalReceive = gql`
		mutation AdditionalReceive(
			$details: [AdditionalReceiveInputType]
		) {
			additionalReceive(
				inventoryReceivedDetails: $details
			) {
				success
			}
		}
	`;
}
