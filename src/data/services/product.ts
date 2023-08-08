import { gql } from 'graphql-request';

export default class ProductService {
	static CompleteDraftRequest = gql`
		mutation CompleteDraftRequest(
			$draftRequestId: Int
			$drafts: [NewDraftInputType]
		) {
			completeDraftRequest(
				draftRequestId: $draftRequestId
				drafts: $drafts
			) {
				success
			}
		}
	`;
	static DraftRequest = gql`
		query DraftRequest($id: ID!) {
			draftRequest(id: $id) {
				draftRequestId
				state
				dateCreated
				dateFinished
				drafts {
					image
					font
					threadColor
					priceWork
					priceWorkLabor
					memo
				}
				productMaster {
					productMasterId
					productNumber
					name
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
				user {
					userId
					identification
					phone
					name
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

	static UpdateDraftImage = gql`
		mutation UpdateDraftImage(
			$draftId: Int
			$image: Upload
		) {
			updateDraftImage(
				draftId: $draftId
				image: $image
			) {
				success
			}
		}
	`;

	static DraftRequests = gql`
		query DraftRequests(
			$offset: Int
			$state: String
			$keyword: String
		) {
			draftRequests(
				state: $state
				offset: $offset
				first: 20
				keyword: $keyword
			) {
				totalCount
				edges {
					node {
						id
						draftRequestId
						state
						dateCreated
						dateFinished
						user {
							id
							userId
							identification
							gymNode {
								id
							}
							phone
							name
							gym {
								id
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

	static ProductMasterNode = gql`
		query ProductMasterNode($nodeId: ID!) {
			productMasterNode(id: $nodeId) {
				id
				productMasterId
				category {
					id
					name
				}
				subCategory {
					id
					name
				}
				brand {
					id
					name
				}
				supplier {
					id
					name
				}
				products {
					id
					modelNumber
					name
					color
					size
					priceAdditional
					inventoryQuantity
					thresholdInventoryQuantity
					goalInventoryQuantity
					state
					dateCreated
					dateUpdated
					isDeleted
				}
				productNumber
				name
				priceConsumer
				priceParent
				priceGym
				priceVendor
				needDraft
				thumbnail
				descriptionImage
				images {
					id
					url
				}
				sizes
				colors
				priceDelivery
				deliveryType
				thresholdInventoryQuantity
				maxQuantityPerBox
				goalInventoryQuantity
				state
				deliveryType
				memo
			}
		}
	`;

	static ProductMaster = gql`
		query ProductMaster($id: Int!) {
			productMaster(id: $id) {
				id
				productMasterId
				category {
					id
					name
				}
				subCategory {
					id
					name
				}
				brand {
					id
					name
				}
				supplier {
					id
					name
				}
				products {
					id
					modelNumber
					name
					color
					size
					priceAdditional
					inventoryQuantity
					thresholdInventoryQuantity
					goalInventoryQuantity
					state
					dateCreated
					dateUpdated
					isDeleted
				}
				productNumber
				name
				priceConsumer
				priceParent
				priceGym
				priceVendor
				needDraft
				thumbnail
				descriptionImage
				images {
					id
					url
				}
				sizes
				colors
				priceDelivery
				deliveryType
				thresholdInventoryQuantity
				maxQuantityPerBox
				goalInventoryQuantity
				state
				deliveryType
				memo
			}
		}
	`;

	static ProductMasters = gql`
		query ProductMasters(
			$category: String
			$subCategory: String
			$brand: String
			$state: String
			$offset: Int
			$name: String
		) {
			productMasters(
				category_Name: $category
				subCategory_Name: $subCategory
				brand_Name: $brand
				state: $state
				offset: $offset
				first: 20
				name_Icontains: $name
			) {
				totalCount
				edges {
					node {
						id
						name
						needDraft
						priceGym
						priceConsumer
						priceParent
						priceVendor
						colors
						sizes
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
						name
						state
						dateCreated
						dateUpdated
						thumbnail
					}
				}
			}
		}
	`;

	static ProductMastersEasyOrder = gql`
		query ProductMasters(
			$offset: Int
			$name: String
			$userId: Int
			$category: String
			$subCategory: String
			$brand: String
		) {
			productMasters(
				state: "판매중"
				offset: $offset
				category_Name: $category
				subCategory_Name: $subCategory
				brand_Name: $brand
				first: 10
				name_Icontains: $name
			) {
				totalCount
				edges {
					node {
						productMasterId
						id
						category {
							id
							name
						}
						subCategory {
							id
							name
						}
						brand {
							id
							name
						}
						name
						needDraft
						thumbnail
						colors
						sizes
						memo
						drafts(userId: $userId) {
							id
							image
							font
							threadColor
							priceWork
							priceWorkLabor
							printing
						}
						priceGym
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
						name
						state
						dateCreated
						dateUpdated
						products {
							id
							color
							size
							inventoryQuantity
							priceAdditional
						}
					}
				}
			}
		}
	`;

	static CreateOrUpdateProductMaster = gql`
		mutation CreateOrUpdateProductMaster(
			$productMaster: ProductMasterInputType!
			$products: [ProductInputType]
			$newImages: [Upload]
			$deletedImageIds: [Int]
		) {
			createOrUpdateProductMaster(
				productMaster: $productMaster
				products: $products
				newImages: $newImages
				deletedImageIds: $deletedImageIds
			) {
				productMaster {
					name
				}
				duplicated
			}
		}
	`;

	static updateCategory = gql`
		mutation UpdateCategory(
			$updatingCategories: [CategoryInputType]!
			$deletingCategoryIds: [Int]
		) {
			updateCategory(
				updatingCategories: $updatingCategories
				deletingCategoryIds: $deletingCategoryIds
			) {
				productExists
				categories {
					id
					name
					order
					depth
					children {
						id
						name
						order
						depth
					}
				}
			}
		}
	`;

	static getCategories = gql`
		query Categories($depth: Int, $parent: Int) {
			categories(depth: $depth, parent: $parent) {
				id
				name
				order
				depth
				children {
					id
					name
					order
					depth
				}
			}
		}
	`;

	static updateBrands = gql`
		mutation UpdateBrand(
			$updatingBrands: [BrandInputType]!
			$deletingBrandIds: [Int]
		) {
			updateBrand(
				updatingBrands: $updatingBrands
				deletingBrandIds: $deletingBrandIds
			) {
				productExists
				brands {
					id
					name
					order
				}
			}
		}
	`;

	static getBrands = gql`
		query Brands {
			brands {
				id
				name
				order
			}
		}
	`;

	static SearchProductMasters = gql`
		query SearchProductMasters(
			$keyword: String
			$userId: Int
			$category: String
			$subCategory: String
			$brand: String
		) {
			productMasters(
				name_Icontains: $keyword
				first: 10
				category_Name: $category
				subCategory_Name: $subCategory
				brand_Name: $brand
			) {
				edges {
					node {
						productMasterId
						category {
							name
						}
						brand {
							name
						}
						subCategory {
							name
						}
						name
						drafts(userId: $userId) {
							id
							image
							memo
							image
							priceWork
							priceWorkLabor
						}
					}
				}
			}
		}
	`;

	static ProductsOrderByInventoryQuantity = gql`
		query Products(
			$category: String
			$subCategory: String
			$brand: String
			$offset: Int
			$name: String
		) {
			products(
				productMaster_Category_Name: $category
				productMaster_SubCategory_Name: $subCategory
				productMaster_Brand_Name: $brand
				offset: $offset
				name_Icontains: $name
				first: 10
				orderBy: "inventory_quantity"
			) {
				totalCount
				edges {
					node {
						productId
						name
						modelNumber
						productMaster {
							priceGym
							brand {
								name
							}
							category {
								name
							}
							subCategory {
								name
							}
						}
						color
						size
						inventoryQuantity
					}
				}
			}
		}
	`;
}
