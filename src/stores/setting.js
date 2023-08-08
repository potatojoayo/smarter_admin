import HttpClient from '../data/providers/http_client';
import SettingService from '../data/services/setting';

const http = HttpClient.getInstance();

export async function getMemberships() {
	const result = await http.request(
		SettingService.Memberships
	);
	return result.memberships;
}
export async function updateMembership(
	membership
) {
	const result = await http.request(
		SettingService.UpdateMembership,
		{
			name: membership.name,
			condition: membership.condition,
			threshold: membership.threshold,
			percentage: membership.percentage,
			max: membership.max
		}
	);
	return result.updateMembership.success;
}

export async function getBanners() {
	const result = await http.request(
		SettingService.Banners
	);
	return result.banners;
}

export async function updateOrCreateBanner(
	banners,
	deletingBannerIds
) {
	let input = [...banners];
	for (let i of input) {
		delete i.image;
	}
	const result = await http.request(
		SettingService.CreateOrUpdateBanner,
		{
			banners: input,
			deletingBannerIds
		}
	);
	return result.createOrUpdateBanner.success;
}

export async function getBankDeliveryInfo() {
	let result = await http.request(
		SettingService.BankDeliveryInfo
	);
	return {
		accounts: result.bankAccounts,
		deliveryAgencies: result.deliveryAgencies,
		extraPriceDelivery: result.extraPriceDelivery
	};
}

export async function createOrUpdateBankAccount(
	accounts,
	deletedAccountIds
) {
	let result = await http.request(
		SettingService.CreateOrUpdateBankAccount,
		{
			accounts,
			deletedAccountIds
		}
	);
	return result.createOrUpdateBankAccount.success;
}

export async function createOrUpdateDeliveryAgency(
	deliveryAgencies,
	deletedAgencyIds
) {
	let result = await http.request(
		SettingService.CreateOrUpdateDeliveryAgency,
		{
			deliveryAgencies,
			deletedAgencyIds
		}
	);
	return result.createOrUpdateDeliveryAgency
		.success;
}

export async function updateExtraPriceDelivery(
	price
) {
	let result = await http.request(
		SettingService.UpdateExtraPriceDelivery,
		{
			price
		}
	);
	return result.updateExtraPriceDelivery.success;
}
