import { gql } from 'graphql-request';

export default class SettingService {
	static CreateOrUpdateBanner = gql`
		mutation CreateOrUpdateBanner(
			$banners: [BannerInputType]
			$deletingBannerIds: [Int]
		) {
			createOrUpdateBanner(
				banners: $banners
				deletingBannerIds: $deletingBannerIds
			) {
				success
			}
		}
	`;

	static Banners = gql`
		query Banners {
			banners {
				id
				name
				image
				order
			}
		}
	`;

	static Memberships = gql`
		query Memberships {
			memberships {
				id
				name
				condition
				threshold
				percentage
				max
			}
		}
	`;
	static UpdateMembership = gql`
		mutation UpdateMembership(
			$name: String
			$condition: Int
			$threshold: Int
			$percentage: Float
			$max: Int
		) {
			updateMembership(
				name: $name
				condition: $condition
				threshold: $threshold
				percentage: $percentage
				max: $max
			) {
				success
			}
		}
	`;

	static BankDeliveryInfo = gql`
		query BankDeliveryInfo {
			bankAccounts {
				id
				bankName
				accountNo
				ownerName
				isDefault
				isActive
			}

			deliveryAgencies {
				id
				name
				isDefault
				isActive
			}

			extraPriceDelivery {
				price
			}
		}
	`;

	static CreateOrUpdateBankAccount = gql`
		mutation CreateOrUpdateBankAccount(
			$accounts: [BankInputType]
			$deletedAccountIds: [Int]
		) {
			createOrUpdateBankAccount(
				accounts: $accounts
				deletedAccountIds: $deletedAccountIds
			) {
				success
			}
		}
	`;

	static CreateOrUpdateDeliveryAgency = gql`
		mutation CreateOrUpdateDeliveryAgency(
			$deliveryAgencies: [DeliveryAgencyInputType]
			$deletedAgencyIds: [Int]
		) {
			createOrUpdateDeliveryAgency(
				deliveryAgencies: $deliveryAgencies
				deletedAgencyIds: $deletedAgencyIds
			) {
				success
			}
		}
	`;

	static UpdateExtraPriceDelivery = gql`
		mutation UpdateExtraPriceDelivery(
			$price: Int
		) {
			updateExtraPriceDelivery(price: $price) {
				success
			}
		}
	`;
}
