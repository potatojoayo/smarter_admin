import { gql } from 'graphql-request';

export default class CalculateService {
	static CompleteSubcontractorCalculation = gql`
		mutation CompleteSubcontractorCalculation(
			$calculationIds: [Int]
		) {
			completeSubcontractorCalculation(
				calculationIds: $calculationIds
			) {
				success
			}
		}
	`;
	static CompleteAgencyCalculation = gql`
		mutation CompleteAgencyCalculation(
			$calculationIds: [Int]
		) {
			completeAgencyCalculation(
				calculationIds: $calculationIds
			) {
				success
			}
		}
	`;
	static SubcontractorCalculation = gql`
		query SubcontractorCalculation(
			$dateFrom: DateTime
			$dateTo: DateTime
			$subcontractor: String
			$offset: Int
			$first: Int
		) {
			subcontractorCalculation(
				dateFrom_Gte: $dateFrom
				dateTo_Lte: $dateTo
				subcontractor_Name: $subcontractor
				offset: $offset
				first: $first
				subcontractor_IsOutWorking: false
				subcontractor_IsPreWorking: false
			) {
				totalCount
				totalPriceWork
				totalWorkAmount
				totalPriceWorkLabor
				edges {
					node {
						calculationId
						subcontractor {
							name
						}
						workAmount
						totalPriceWork
						totalPriceWorkLabor
						dateFrom
						dateTo
						state
					}
				}
			}
		}
	`;
	static AgencyCalculation = gql`
		query AgencyCalculation(
			$dateFrom: DateTime
			$dateTo: DateTime
			$agency: String
			$offset: Int
			$first: Int
		) {
			agencyCalculation(
				dateFrom_Gte: $dateFrom
				dateTo_Lte: $dateTo
				agency_Name: $agency
				offset: $offset
				first: $first
			) {
				totalCount
				totalSell
				totalProfit
				totalPricePlatform
				totalNetProfit
				edges {
					node {
						calculationId
						agency {
							name
						}
						agencyTotalSell
						priceProfit
						pricePlatform
						dateFrom
						dateTo
						netProfit
						state
					}
				}
			}
		}
	`;
}
