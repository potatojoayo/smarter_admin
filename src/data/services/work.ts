import { gql } from 'graphql-request';

export default class WorkService {
	static CompletePreWorks = gql`
		mutation CompletePreWorks(
			$workIds: [Int]
			$subcontractorId: Int
		) {
			completePreWorks(
				workIds: $workIds
				subcontractorId: $subcontractorId
			) {
				success
			}
		}
	`;
	static UpdateWorkMemos = gql`
		mutation UpdateWorkMemos(
			$workId: Int
			$memoBySubcontractor: String
			$memoByAdmin: String
			$memoByPreWorker: String
		) {
			updateWorkMemos(
				workId: $workId
				memoBySubcontractor: $memoBySubcontractor
				memoByAdmin: $memoByAdmin
				memoByPreWorker: $memoByPreWorker
			) {
				success
			}
		}
	`;
	static CompleteWorks = gql`
		mutation CompleteWorks($workIds: [Int]) {
			completeWorks(workIds: $workIds) {
				success
			}
		}
	`;
	static Work = gql`
		query Work($id: ID!) {
			subcontractors(isOutWorking: false) {
				id
				name
				dailyCumulativeWork
				isPreWorking
			}

			work(id: $id) {
				workId
				memoByAdmin
				memoBySubcontractor
				memoByPreWorker
				state
				productNames

				orderMaster {
					orderNumber
					user {
						name
						phone
						gym {
							name
						}
					}
				}
				drafts {
					image
					memo
					font
					priceWork
					priceWorkLabor
					threadColor
					subCategory {
						name
					}
				}
				subcontractor {
					name
					isPreWorking
				}
				dateCreated
				details {
					userRequest
					draft {
						id
						image
						memo
						font
						priceWork
						printing
						priceWorkLabor
						threadColor
						subCategory {
							name
						}
					}
					product {
						name
						color
						size
					}
					productMaster {
						thumbnail
					}
					quantity
					state
					orderMaster {
						user {
							phone
							name
							gym {
								name
							}
						}
					}
					studentNames
					userRequest
				}
			}
		}
	`;

	static WorksForPrint = gql`
		query Work($ids: [Int]) {
			works(ids: $ids) {
				edges {
					node {
						workId
						memoByAdmin
						memoBySubcontractor
						memoByPreWorker
						state
						productNames

						orderMaster {
							orderNumber
							user {
								name
								phone
								gym {
									name
								}
							}
						}
						drafts {
							image
							memo
							font
							priceWork
							priceWorkLabor
							threadColor
							subCategory {
								name
							}
						}
						subcontractor {
							name
							isPreWorking
						}
						dateCreated
						details {
							userRequest
							draft {
								id
								image
								memo
								font
								priceWork
								printing
								priceWorkLabor
								threadColor
								subCategory {
									name
								}
							}
							product {
								name
								color
								size
							}
							productMaster {
								thumbnail
							}
							quantity
							state
							orderMaster {
								user {
									phone
									name
									gym {
										name
									}
								}
							}
							studentNames
							userRequest
						}
					}
				}
			}
		}
	`;
	static Works = gql`
		query Works(
			$subcontractor: String
			$dateFrom: DateTime
			$dateTo: DateTime
			$offset: Int
			$states: [String]
			$state: String
			$isOutWorking: Boolean
			$keyword: String
			$ids: [Int]
		) {
			works(
				subcontractor_Name_Icontains: $subcontractor
				dateCreated_Gte: $dateFrom
				dateCreated_Lte: $dateTo
				offset: $offset
				state: $state
				details_State_In: $states
				subcontractor_IsOutWorking: $isOutWorking
				first: 20
				keyword: $keyword
				ids: $ids
			) {
				totalCount
				edges {
					node {
						id
						state
						workId
						dateCreated
						dateFinished
						orderMaster {
							orderMasterId
							id
							orderNumber
							user {
								name
								phone
								gym {
									name
								}
							}
						}
						subcontractor {
							name
						}
						productNames
					}
				}
			}
			subcontractors(
				isOutWorking: $isOutWorking
			) {
				id
				name
				dailyCumulativeWork
			}
		}
	`;
	static Subcontractors = gql`
		query Subcontractors(
			$isOutWorking: Boolean
			$isPreWorking: Boolean
		) {
			subcontractors(
				isOutWorking: $isOutWorking
				isPreWorking: $isPreWorking
			) {
				id
				name
				isOutWorking
				isPreWorking
				dailyCumulativeWork
			}
		}
	`;

	static AssignWork = gql`
		mutation AssignWork(
			$orderDetailIds: [Int]
			$subcontractorId: Int!
			$memo: String
		) {
			assignWork(
				orderDetailIds: $orderDetailIds
				subcontractorId: $subcontractorId
				memo: $memo
			) {
				success
				notApplicable
			}
		}
	`;

	static UpdateMemo = gql`
		mutation UpdateWork(
			$workId: Int
			$memo: String
		) {
			updateWork(workId: $workId, memo: $memo) {
				success
			}
		}
	`;
}
