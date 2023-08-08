import { gql } from 'graphql-request';

export default class UserService {
	static TodayChargeOrderCountByState = gql`
		query TodayChargeOrderCountByState(
			$state: String
		) {
			todayChargeOrderCountByState(state: $state)
		}
	`;
	static TodayDraftRequestCountByState = gql`
		query TodayDraftRequestCountByState(
			$state: String
		) {
			todayDraftRequestCountByState(state: $state)
		}
	`;
	static Gyms = gql`
		query Gyms(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
			$membership: String
			$name: String
			$keyword: String
			$hasDraft: Boolean
		) {
			gyms(
				offset: $offset
				dateCreated_Lte: $dateTo
				dateCreated_Gte: $dateFrom
				membership_Name: $membership
				name_Icontains: $name
				first: 20
				keyword: $keyword
				draftExists: $hasDraft
			) {
				totalCount
				edges {
					node {
						id
						name
						totalPurchasedAmount
						groups
						dateCreated
						membership
						hasDraft
						agency {
							name
						}
						businessRegistrationNumber
						user {
							userId
							name
							identification
							phone
							isActive
							wallet {
								balance
							}
						}
					}
				}
			}
		}
	`;

	static Gym = gql`
		query Gym($id: ID!) {
			gym(id: $id) {
				gymId
				user {
					userId
					identification
					name
					phone
					isActive
				}
				name
				agency {
					agencyId
					name
				}
				managerName
				address
				email
				memo
				detailAddress
				zipCode
				businessRegistrationNumber
				businessRegistrationCertificate
			}
		}
	`;

	static ChargeSmarterMoney = gql`
		mutation ChargeSmarterMoney(
			$orderId: String!
			$userId: Int
		) {
			chargeSmarterMoney(
				orderId: $orderId
				userId: $userId
			) {
				success
			}
		}
	`;
	static BulkChargeSmarterMoney = gql`
		mutation BulkChargeSmarterMoney(
			$orders: [ChargeSmarterMoneyInputType]
		) {
			bulkChargeSmarterMoney(orders: $orders) {
				successCount
			}
		}
	`;
	static ChargeOrders = gql`
		query ChargeOrders(
			$offset: Int
			$state: String
			$keyword: String
		) {
			chargeOrders(
				state: $state
				offset: $offset
				keyword: $keyword
				first: 20
			) {
				totalCount
				edges {
					node {
						orderId
						state
						dateCreated
						dateUpdated
						amount
						method
						user {
							userId
							id
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
			}
		}
	`;

	static Wallets = gql`
		query Wallets(
			$page: Int
			$keyword: String
			$sortType: String
		) {
			wallets(
				page: $page
				keyword: $keyword
				sortType: $sortType
			) {
				totalCount
				wallets {
					id
					user {
						name
					}
					balance
					identification
					gymName
					phone
					totalChargeAmount
					totalUsedAmount
				}
			}
		}
	`;

	static GymsSmarterMoneyHistories = gql`
		query GymsSmarterMoneyHistories(
			$keyword: String
			$year: Int
			$month: Int
			$page: Int
		) {
			gymsSmarterMoneyHistories(
				keyword: $keyword
				year: $year
				month: $month
				page: $page
			) {
				totalCount
				smarterMoneyHistories {
					wallet {
						id
						balance
						gymName
						phone
					}
					id
					historyNumber
					transactionType
					amount
					dateCreated
					orderNumber
				}
			}
		}
	`;

	static Agencies = gql`
		query Agencies(
			$offset: Int
			$dateFrom: DateTime
			$dateTo: DateTime
			$name: String
			$first: Int
		) {
			agencies(
				offset: $offset
				dateCreated_Lte: $dateTo
				dateCreated_Gte: $dateFrom
				name_Icontains: $name
				first: $first
			) {
				totalCount
				edges {
					node {
						agencyId
						id
						user {
							identification
							name
							phone
						}
						name
						region
						dateCreated
						businessRegistrationNumber
					}
				}
			}
		}
	`;

	static Agency = gql`
		query Agency($id: ID!) {
			agency(id: $id) {
				agencyId
				user {
					userId
					identification
					name
					phone
				}
				name
				region
				address
				detailAddress
				zipCode
				businessRegistrationNumber
				businessRegistrationCertificate
				email
				memo
			}
		}
	`;

	static CreateOrUpdateAgency = gql`
		mutation CreateOrUpdateAgency(
			$agency: AgencyInputType
		) {
			createOrUpdateAgency(agency: $agency) {
				success
				duplicated
			}
		}
	`;

	static UpdateGym = gql`
		mutation UpdateGym($gym: GymInputType) {
			updateGym(gym: $gym) {
				success
			}
		}
	`;

	static GymDrafts = gql`
		query GymDrafts(
			$userId: Int
			$subCategory: String
		) {
			drafts(
				userId: $userId
				subCategoryName: $subCategory
			) {
				id
				subCategory {
					name
				}
				priceWork
				priceWorkLabor
				memo
				threadColor
				font
				image
				printing
			}
		}
	`;

	static CreateDraft = gql`
		mutation CreateDraft(
			$userId: Int
			$draft: DraftInputType
		) {
			createDraft(
				userId: $userId
				draft: $draft
			) {
				success
				draft {
					id
					image
					font
					threadColor
					priceWork
					priceWorkLabor
				}
			}
		}
	`;

	static CreateMultipleDrafts = gql`
		mutation CreateMultipleDrafts(
			$userId: Int
			$draft: DraftInputType
			$categoryName: String
			$subCategoryName: String
		) {
			createMultipleDrafts(
				userId: $userId
				draft: $draft
				categoryName: $categoryName
				subCategoryName: $subCategoryName
			) {
				success
			}
		}
	`;

	static DeleteMultipleDrafts = gql`
		mutation DeleteMultipleDrafts(
			$userId: Int
			$categoryName: String
			$subCategoryName: String
		) {
			deleteMultipleDrafts(
				userId: $userId
				categoryName: $categoryName
				subCategoryName: $subCategoryName
			) {
				success
			}
		}
	`;

	static UpdateDrafts = gql`
		mutation UpdateDrafts(
			$userId: Int
			$drafts: [DraftInputType]
		) {
			updateDrafts(
				userId: $userId
				drafts: $drafts
			) {
				success
			}
		}
	`;

	static DeleteDrafts = gql`
		mutation DeleteDrafts(
			$deletedDraftIds: [Int]
		) {
			deleteDrafts(
				deletedDraftIds: $deletedDraftIds
			) {
				success
			}
		}
	`;

	static Admins = gql`
		query Admins($offset: Int, $keyword: String) {
			users(
				offset: $offset
				name_Icontains: $keyword
				isAdmin: true
			) {
				totalCount
				edges {
					node {
						id
						identification
						name
						phone
						dateCreated
						group
					}
				}
			}
		}
	`;

	static Admin = gql`
		query Admin($id: ID!) {
			user(id: $id) {
				id
				userId
				identification
				name
				phone
				group
				isAdmin
			}
		}
	`;

	static CreateOrUpdateAdmin = gql`
		mutation CreateOrUpdateAdmin(
			$user: UserInputType
			$group: String
		) {
			createOrUpdateAdmin(
				user: $user
				group: $group
			) {
				success
			}
		}
	`;

	static SubcontractorUsers = gql`
		query SubcontractorUsers(
			$offset: Int
			$keyword: String
		) {
			subcontractorNodes(
				offset: $offset
				first: 20
				name_Icontains: $keyword
			) {
				totalCount
				edges {
					node {
						id
						user {
							identification
							name
							phone
							dateCreated
						}
						name
						businessRegistrationNumber
						address
						detailAddress
					}
				}
			}
		}
	`;
	static SubcontractorUser = gql`
		query SubcontractorUser($id: ID!) {
			subcontractor(id: $id) {
				id
				subcontractorId
				user {
					userId
					identification
					name
					phone
				}
				name
				businessRegistrationNumber
				address
				detailAddress
				zipCode
			}
		}
	`;

	static CreateOrUpdateSubcontractor = gql`
		mutation CreateOrUpdateSubcontractor(
			$subcontractor: SubcontractorInputType
		) {
			createOrUpdateSubcontractor(
				subcontractor: $subcontractor
			) {
				success
				duplicated
			}
		}
	`;

	static CreateOrUpdateDraft = gql`
		mutation CreateOrUpdateDraft(
			$userId: Int
			$draft: NewDraftInputType
			$subCategory: String
		) {
			createOrUpdateDraft(
				userId: $userId
				draft: $draft
				subCategory: $subCategory
			) {
				success
				draft {
					id
					priceWork
					priceWorkLabor
					printing
					font
					threadColor
					memo
				}
			}
		}
	`;
}
